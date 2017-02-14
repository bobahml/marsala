using Common.Model;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebApplication1.Services
{
	internal static class SummaryHelper
	{
		public static Summary GenerateSummary(Order[] orders)
		{
			var total = new Summary
			{
				Orders = orders,
				Salad = new List<Course>(),
				Soup = new List<Course>(),
				MainCourse = new List<Course>(),
				Drink = new List<Course>(),
				Snacks = new List<Course>(),
				OrderText = string.Empty
			};

			foreach (var order in orders)
			{
				UpdateAggregation(order.Salad, total.Salad);
				UpdateAggregation(order.Soup, total.Soup);
				UpdateAggregation(order.MainCourse, total.MainCourse);
				UpdateAggregation(order.Drink, total.Drink);

				if (order.Snacks != null)
				{
					foreach (var snack in order.Snacks)
					{
						UpdateAggregation(snack, total.Snacks);
					}
				}
			}

			BindOrderText(total);
			return total;
		}

		private static void UpdateAggregation(string name, ICollection<Course> dic)
		{
			var val = name.Trim();
			if (!string.IsNullOrEmpty(val))
			{
				var exists = dic.FirstOrDefault(d => d.Name == val);
				if (exists != null)
					exists.Count++;
				else dic.Add(new Course { Name = val, Count = 1 });
			}
		}

		private static void BindOrderText(Summary total)
		{
			var sb = new StringBuilder();
			sb.AppendLine("Добрый день!");
			sb.AppendLine("Хотели бы заказать:");
			sb.AppendLine();

			foreach (var course in total.Salad)
				sb.AppendLine($"{course.Name} ({course.Count})");
			sb.AppendLine();

			foreach (var course in total.Soup)
				sb.AppendLine($"{course.Name} ({course.Count})");
			sb.AppendLine();


			foreach (var course in total.MainCourse)
				sb.AppendLine($"{course.Name} ({course.Count})");
			sb.AppendLine();


			foreach (var course in total.Drink)
				sb.AppendLine($"{course.Name} ({course.Count})");
			sb.AppendLine();


			foreach (var course in total.Snacks)
				sb.AppendLine($"{course.Name} ({course.Count})");
			sb.AppendLine();

			if (total.Orders.Any(o => o.PaymentMethod == PaymentMethod.Card))
				sb.AppendLine("Оплату планируем произвести картой.");
			else
				sb.AppendLine("Оплату планируем произвести наличными.");
			sb.AppendLine();

			sb.AppendLine("Спасибо!");

			total.OrderText = sb.ToString();
		}

	}
}
