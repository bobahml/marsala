using System.Collections.Generic;

namespace Common.Model
{
	public class Course
	{
		public string Name { get; set; }
		public int Count { get; set; }
	}

	public class Summary
	{
		public ICollection<Order> Orders { get; set; }
		public string OrderText { get; set; }
		public List<Course> Salad { get; set; }
		public List<Course> Soup { get; set; }
		public List<Course> MainCourse { get; set; }
		public List<Course> Drink { get; set; }
		public List<Course> Snacks { get; set; }
	}
}
