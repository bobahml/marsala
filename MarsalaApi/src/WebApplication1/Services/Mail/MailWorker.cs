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

namespace WebApplication1.Services.Mail
{
	public interface IMailWorker
	{
		MenuFile GetLastSupportedAttachment(DateTime? lastDate);
		void Send(string subject, string body);
        void FastSendEmail(string email, string subject, string body, bool isBodyHtml);
    }

	internal class MailWorker : IMailWorker, IDisposable
	{
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

						var at = message.Attachments.Where(SupportedAttachment)
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

		public void Send(string subject, string body)
		{
			SendEmail(_mailSettings.Recipient, subject, body);
		}

		private void SendEmail(string email, string subject, string body)
		{
			lock (_mailSettings)
			{
				using (var smtpClient = GetSmtpClient())
				{
					var mail = new System.Net.Mail.MailMessage(_mailSettings.UserName, email)
					{
						Subject = subject,
						Body = body
					};
					smtpClient.Send(mail);
				}

				if (string.IsNullOrEmpty(_mailSettings.CopyToFolder))
					return;

				try
				{
					//Copy the message to sent folder. 
					using (var imapClient = GetImapClient())
					{
						var msg = new AE.Net.Mail.MailMessage
						{
							From = new MailAddress(_mailSettings.UserName),
							To = { new MailAddress(email) },
							Subject = subject,
							Body = body
						};

						imapClient.AppendMail(msg, _mailSettings.CopyToFolder);
					}
				}
				catch { }
			}
		}

        private readonly AsyncQueue<System.Net.Mail.MailMessage> _asyncQueue = new AsyncQueue<System.Net.Mail.MailMessage>();

        private async Task Worker(CancellationToken token)
        {
            while (!token.IsCancellationRequested)
            {
                var item = await _asyncQueue.TakeAsync(token);
                try
                {
                    Send(item);
                    _logger.LogInformation($"SendMailSuccess {item.To}.");
                }
                catch (Exception e)
                {
                    _logger.LogError($"SendMailError {item.To}: {item.Body} error={e}");
                }
            }
        } 

        private void Send(System.Net.Mail.MailMessage mail)
        {
            lock (_mailSettings)
            {
                using (var smtpClient = GetSmtpClient())
                {
                    smtpClient.Send(mail);
                }
            }
        }

        public void FastSendEmail(string email, string subject, string body, bool isBodyHtml)
        {
            var mail = new System.Net.Mail.MailMessage(_mailSettings.UserName, email)
            {
                Subject = subject,
                IsBodyHtml = isBodyHtml,
                Body = body
            };

            _asyncQueue.Add(mail);
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

		private static bool SupportedAttachment(Attachment a)
		{
			var ext = Path.GetExtension(a.Filename)?.ToLower();

			if (string.IsNullOrEmpty(ext))
				return false;

			return ext == ".docx" || ext == ".doc" || ext == ".xls" || ext == ".xlsx";
		}

        public void Dispose()
        {
            _cts.Cancel();
        }
    }

}
