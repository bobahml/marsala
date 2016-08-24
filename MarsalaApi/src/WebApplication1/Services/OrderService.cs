using System;
using Common.Model;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebApplication1.Services
{
	public interface IOrderService
	{
		void MakeAnOrder(Order order);
		Summary GetSummary();
		Summary DeleteOrder(string userName);
	}


	public class OrderService : IOrderService
	{
		private readonly IClientInterationService _clientInterationService;
		private DateTime _orderDate = DateTime.Now.Date;
		private readonly ConcurrentDictionary<string, Order> _orders = new ConcurrentDictionary<string, Order>();

		public OrderService(IClientInterationService clientInterationService)
		{
			_clientInterationService = clientInterationService;
		}

		public void MakeAnOrder(Order order)
		{
			if (DateTime.Now.Date != _orderDate)
			{
				_orderDate = DateTime.Now.Date;
				_orders.Clear();
			}
			_orders[order.UserName] = order;

			_clientInterationService.NotifyOrderUpdated(order);
		}

		public Summary GetSummary()
		{
			var total = new Summary
			{
				Orders = _orders.Values,
				Salad = new List<Course>(),
				Soup = new List<Course>(),
				MainCourse = new List<Course>(),
				Drink = new List<Course>(),
				Snacks = new List<Course>(),
				OrderText = string.Empty
			};

			foreach (var order in _orders.Values)
			{
				UpdateAggregation(order.Salad, total.Salad);
				UpdateAggregation(order.Soup, total.Soup);
				UpdateAggregation(order.MainCourse, total.MainCourse);
				UpdateAggregation(order.Drink, total.Drink);

				if (order.Snacks!= null)
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

		public Summary DeleteOrder(string userName)
		{
			Order o;
			_orders.TryRemove(userName, out o);
			var summary =  GetSummary();

			_clientInterationService.NotifyOrderUpdated(new Order { UserName = userName });
			return summary;
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

			sb.AppendLine("Спасибо!");

			total.OrderText = sb.ToString();
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
	}
}
