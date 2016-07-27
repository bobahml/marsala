using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Common.Model;

namespace CommonLogic
{
	internal class TextMenuParser 
	{
		public ICollection<DailyMenu> Parse(string menuDoc)
		{
			var main = new Regex(@"Салаты.*?:(?<salad>[\s\S]+?)Супы.*?:(?<soup>[\s\S]+?)Второе.*?:(?<maincorse>[\s\S]+?)Напитки.*?:(?<drink>[\s\S]+?)((Хлеб)|(ПРИЯТНОГО))");
			var collection = main.Matches(menuDoc);
			var results = new List<DailyMenu>(collection.Count);

			for (int i = 0; i < collection.Count; i++)
			{
				var menu = new DailyMenu();
				var match = collection[i];
				menu.Salad = GetCollection(match, "salad");

				menu.Soup = GetCollection(match, "soup");

				menu.MainCourse = GetCollection(match, "maincorse");

				menu.Drink = GetCollection(match, "drink");

				results.Add(menu);
			}

			return results;

		}

		private static string[] GetCollection(Match match, string groupName)
		{
			if (match.Groups[groupName].Success)
			{
				var saladsStr = match.Groups[groupName].Value;
				var salads = saladsStr.Split(new[] { '\t', '\n' }, StringSplitOptions.RemoveEmptyEntries)
					.Select(s => s.Trim())
					.Where(s => !string.IsNullOrEmpty(s))
					.ToArray();
				return salads;
			}
			return new string[0];
		}
	}
}