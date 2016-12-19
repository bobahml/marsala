using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Common.Services
{
	public static class CustomDateParser
	{
		class InternalDate
		{
			public int day;
			public int month;
			public int year;

			public bool FullInit => year > 0 && month > 0 && day > 0;
		}

		public static IEnumerable<DateTime> TryParseStartDateFromSubject(string message)
		{
			var dateRegex = new Regex(@"(?<day>\d{1,2})(\.(?<month>\d{1,2}))?(\.(?<year>\d{2,4}))?");
			var matches = dateRegex.Matches(message);

			var dates = new List<InternalDate>();

			for (var i = 0; i < matches.Count; i++)
			{
				var match = matches[i];

				var date = new InternalDate();
				date.day = int.Parse(match.Groups["day"].Value);

				if (match.Groups["month"].Success)
				{
					date.month = int.Parse(match.Groups["month"].Value);
				}

				if (match.Groups["year"].Success)
				{
					date.year = int.Parse(match.Groups["year"].Value);
					if (date.year < 100)
					{
						date.year += 2000;
					}
				}

				if (date.day <= 31 && date.month <= 12 && date.year <= DateTime.Now.Year)
					dates.Add(date);
			}

			if (dates.Count == 0)
			{
				return new DateTime[0];
			}

			var results = new List<DateTime>();

			foreach (var date in dates)
			{
				if (date.year == 0)
				{
					var fillYear = dates.FirstOrDefault(d => d.year > 0);
					date.year = fillYear?.year ?? DateTime.Now.Year;
				}


				if (date.month == 0)
				{
					var fullMonth = dates.FirstOrDefault(d => d.month > 0);
					if (fullMonth != null)
					{
						if (fullMonth.day == 1 && fullMonth.month > 1)
						{
							date.month = fullMonth.month - 1;
						}
						else
						{
							date.month = fullMonth.month;
						}
					}
					else
					{
						date.month = DateTime.Now.Month;
					}
				}


				results.Add(new DateTime(date.year, date.month, date.day, 0, 0, 0, DateTimeKind.Local));
			}


			return results.OrderBy(d => d);
		}
	}
}
