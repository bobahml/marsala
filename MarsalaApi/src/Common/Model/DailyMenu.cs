using System.Collections.Generic;

namespace Common.Model
{
	public class DailyMenu
	{
		public string Header { get; set; }
		public ICollection<string> Salad { get; set; }
		public ICollection<string> Soup { get; set; }
		public ICollection<string> MainCourse { get; set; }
		public ICollection<string> Drink { get; set; }
	}
}
