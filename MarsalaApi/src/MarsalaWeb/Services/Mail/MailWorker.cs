using System;
using System.IO;
using System.Linq;
using System.Net.Mail;
using AE.Net.Mail;
using Microsoft.Extensions.Options;
using Attachment = AE.Net.Mail.Attachment;
using HellBrick.Collections;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace MarsalaWeb.Services.Mail
{
	public interface IMailWorker
	{
		MenuFile GetLastSupportedAttachment(DateTime? lastDate);
		void SendAsync(string subject, string body, Action<SentStatus> calback);
		void SendAsync(string email, string subject, string body, bool isBodyHtml);
	}

	internal class MailWorker : IMailWorker, IDisposable
	{
		private class MailMessageTask
		{
			public MailMessageTask(System.Net.Mail.MailMessage mailMessage, string copyToFolder, Action<SentStatus> callback)
			{
				MailMessage = mailMessage;
				CopyToFolder = copyToFolder;
				Callback = callback;
			}

			public System.Net.Mail.MailMessage MailMessage { get; }
			public Action<SentStatus> Callback { get; }
			public string CopyToFolder { get; }
		}

		private readonly AsyncQueue<MailMessageTask> _asyncQueue = new AsyncQueue<MailMessageTask>();
		private static readonly string[] SupportedExtensions = new[] { ".docx", ".doc", ".xls", ".xlsx" };
		private readonly MailSettings _mailSettings;
		private readonly CancellationTokenSource _cts;
		private readonly Task _workerTask;
		private readonly ILogger _logger;

		public MailWorker(IOptions<MailSettings> mailSettings, ILoggerFactory loggerFactory)
		{
			_mailSettings = mailSettings.Value;
			_logger = loggerFactory.CreateLogger<MailWorker>();

			_cts = new CancellationTokenSource();
			_workerTask = Worker(_cts.Token);
		}

		public MenuFile GetLastSupportedAttachment(DateTime? lastDate)
		{
			lock (_mailSettings)
			{
				using (var imapClient = GetImapClient())
				{
					imapClient.SelectMailbox("Inbox");
					var messageCount = imapClient.GetMessageCount();

					for (var offset = 1; offset < messageCount; offset++)
					{
						var index = messageCount - offset;
						var message = imapClient.GetMessage(index, false, false);
						if (message == null)
							return null;

						if (lastDate.HasValue && message.Date < lastDate)
							break;

						var at = message.Attachments.Where(IsSupportedAttachment)
								.Select(a => new MenuFile
								{
									MessageDate = message.Date,
									MessageSubject = message.Subject,
									FileName = a.Filename,
									Data = a.GetData()
								})
						.FirstOrDefault();

						if (at == null)
							continue;

						return at;
					}
				}
				return null;
			}
		}

		public void SendAsync(string subject, string body, Action<SentStatus> calback)
		{
			var mail = new System.Net.Mail.MailMessage(_mailSettings.UserName, _mailSettings.Recipient)
			{
				Subject = subject,
				Body = body
			};

			_asyncQueue.Add(new MailMessageTask(mail, _mailSettings.CopyToFolder, calback));
		}

		public void SendAsync(string email, string subject, string body, bool isBodyHtml)
		{
			var mail = new System.Net.Mail.MailMessage(_mailSettings.UserName, email)
			{
				Subject = subject,
				IsBodyHtml = isBodyHtml,
				Body = body
			};

			_asyncQueue.Add(new MailMessageTask(mail, "", s => { }));
		}

		private async Task Worker(CancellationToken token)
		{
			while (!token.IsCancellationRequested)
			{
				var item = await _asyncQueue.TakeAsync(token).ConfigureAwait(false);
				var status = new SentStatus();
				try
				{
					SendInternal(item.MailMessage, item.CopyToFolder);
					status.StatusText = "The mail was successfully sent.";
					status.IsSuccess = true;
					_logger.LogInformation($"{status.StatusText} : {item.MailMessage.To}.");
				}
				catch (Exception e)
				{
					status.StatusText = $"Failure sending mail error message: {e.Message}";
					status.IsSuccess = false;
					_logger.LogError($"SendMailError {item.MailMessage.To}: {item.MailMessage.Body}. Error={e}");
				}
				finally
				{
					item.MailMessage.Dispose();
				}

				item.Callback(status);
			}
		}

		private void SendInternal(System.Net.Mail.MailMessage mail, string copyToFolder)
		{
			lock (_mailSettings)
			{
				using (var smtpClient = GetSmtpClient())
				{
					smtpClient.Send(mail);
				}

				if (string.IsNullOrEmpty(copyToFolder))
					return;

				try
				{
					using (var imapClient = GetImapClient())
					{
						var msg = ConvertMessage(mail);
						imapClient.AppendMail(msg, _mailSettings.CopyToFolder);
					}
				}
				catch (Exception e)
				{
					_logger.LogWarning($"Error when COPYING message to={mail.To}, Exception={e}");
				}
			}
		}

		private ImapClient GetImapClient()
		{
			return new ImapClient(_mailSettings.InHost, _mailSettings.UserName, _mailSettings.Password, port: _mailSettings.InPort, secure: _mailSettings.Ssl);
		}

		private SmtpClient GetSmtpClient()
		{
			var smtpClient = new SmtpClient(_mailSettings.OutHost, _mailSettings.OutPort)
			{
				Credentials = new System.Net.NetworkCredential(_mailSettings.UserName, _mailSettings.Password),
				DeliveryMethod = SmtpDeliveryMethod.Network,
				EnableSsl = _mailSettings.Ssl
			};
			return smtpClient;
		}

		private static AE.Net.Mail.MailMessage ConvertMessage(System.Net.Mail.MailMessage mail)
		{
			var msg = new AE.Net.Mail.MailMessage()
			{
				From = mail.From,
				To = { },
				Subject = mail.Subject,
				Body = mail.Body
			};

			foreach (var item in mail.To)
			{
				msg.To.Add(item);
			}

			return msg;
		}

		private static bool IsSupportedAttachment(Attachment a)
		{
			var ext = Path.GetExtension(a.Filename)?.ToLower();

			if (string.IsNullOrEmpty(ext))
				return false;

			return SupportedExtensions.Contains(ext);
		}

		public void Dispose()
		{
			_cts.Cancel();
		}
	}
}
