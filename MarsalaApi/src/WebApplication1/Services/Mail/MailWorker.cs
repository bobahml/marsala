using System;
using System.IO;
using System.Linq;
using System.Net.Mail;
using AE.Net.Mail;
using Microsoft.Extensions.Options;
using WebApplication1.Services.Mail;
using Attachment = AE.Net.Mail.Attachment;

namespace WebApplication1.Services
{
	public interface IMailWorker
	{
		MenuFile GetLastSupportedAttachment(DateTime? lastDate);
		void Send(string address, string subject, string body);
	}

	internal class MailWorker: IMailWorker
	{
		private readonly MailSettings _mailSettings;

		public MailWorker(IOptions<MailSettings>  mailSettings)
		{
			_mailSettings = mailSettings.Value;
		}

		public MenuFile GetLastSupportedAttachment(DateTime? lastDate)
		{
			using (var imapClient = new ImapClient(_mailSettings.InHost, _mailSettings.UserName, _mailSettings.Password, port: _mailSettings.InPort, secure: _mailSettings.Ssl))
			{
				imapClient.SelectMailbox("Inbox");
				var messageCount = imapClient.GetMessageCount();

				for (var offset = 1; offset < messageCount; offset++)
				{
					var index = messageCount - offset;
					var message = imapClient.GetMessage(index, false, false);
					if (message == null)
						return null;

					if (lastDate.HasValue && message.Date <= lastDate)
						return null;

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


		public void Send(string address, string subject, string body)
		{
			using (var smtpClient = new SmtpClient(_mailSettings.OutHost, _mailSettings.OutPort))
			{
				smtpClient.Credentials = new System.Net.NetworkCredential(_mailSettings.UserName, _mailSettings.Password);
				smtpClient.EnableSsl = _mailSettings.Ssl;

				var mail = new System.Net.Mail.MailMessage(_mailSettings.UserName, address)
				{
					Subject = subject,
					Body = body
				};

				smtpClient.Send(mail);
			}
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
