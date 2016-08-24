using System.Collections.Generic;

namespace Common.Model
{
    public class Order
    {
        public string UserName { get; set; }
        public string Salad { get; set; }
        public string Soup { get; set; }
        public string MainCourse { get; set; }
        public string Drink { get; set; }
		public ICollection<string> Snacks { get; set; }
	}
}