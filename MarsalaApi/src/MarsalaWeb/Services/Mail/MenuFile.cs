using System;

namespace MarsalaWeb.Services.Mail
{
	public class MenuFile
	{
		public DateTime MessageDate { get; set; }
		public string MessageSubject { get; set; }
		public byte[] Data { get; set; }
		public string FileName { get; set; }
	}
}