namespace MarsalaWeb.Services.Mail
{
	internal class MailSettings
	{
		public string InHost { get; set; }
		public int InPort { get; set; }

		public string OutHost { get; set; }
		public int OutPort { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
		public bool Ssl { get; set; } = true;

		public string Recipient { get; set; }
		public string CopyToFolder { get; set; }
	}
}