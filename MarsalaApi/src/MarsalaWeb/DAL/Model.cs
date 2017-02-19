namespace Angular2WebpackVisualStudio.DAL
{
	public class DaylyMenuStore
	{
		/// <summary>
		/// yyyy-MM-dd
		/// </summary>
		public string Date { get; set; }
		public string MenuJson { get; set; }
	}

	public class OrderStore
	{
		/// <summary>
		/// yyyy-MM-dd
		/// </summary>
		public string Date { get; set; }
		public string UserName { get; set; }
		public string OrderJson { get; set; }
	}
}
