using System;
using System.IO;
using System.Linq;
using System.Net.Mail;
using AE.Net.Mail;
using Microsoft.Extensions.Options;
using Attachment = AE.Net.Mail.Attachment;

namespace WebApplication1.Services.Mail
{
	public interface IMailWorker
	{
		MenuFile GetLastSupportedAttachment(DateTime? lastDate);
		void Send(string subject, string body);
	}

	internal class MailWorker : IMailWorker
	{
		private readonly MailSettings _mailSettings;

		public MailWorker(IOptions<MailSettings> mailSettings)
		{
			_mailSettings = mailSettings.Value;
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
			var toAddress = _mailSettings.Recipient;
			lock (_mailSettings)
			{
				using (var smtpClient = GetSmtpClient())
				{
					var mail = new System.Net.Mail.MailMessage(_mailSettings.UserName, toAddress)
					{
						Subject = subject,
						Body = body
					};
					smtpClient.Send(mail);
				}


				if (!string.IsNullOrEmpty(_mailSettings.CopyToFolder))
				{
					try
					{
						//Copy the message to sent folder. 
						using (var imapClient = GetImapClient())
						{
							var msg = new AE.Net.Mail.MailMessage
							{
								From = new MailAddress(_mailSettings.UserName),
								To = { new MailAddress(toAddress) },
								Subject = subject,
								Body = body
							};

							imapClient.AppendMail(msg, _mailSettings.CopyToFolder);
						}
					}
					catch { }
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
	}

}
