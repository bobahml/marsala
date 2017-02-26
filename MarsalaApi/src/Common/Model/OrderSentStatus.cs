using System;

namespace Common.Model
{
	public class OrderSentStatus
	{
		public string SenderName { get; set; }
		public string StatusText { get; set; }
		public bool IsSuccess { get; set; }
		public DateTime SentDate { get; set; }
	}
}
