using System;
using System.Linq;
using System.Threading.Tasks;
using Common.Model;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace MarsalaWeb.DAL
{
	public interface IOrdersStore
	{
		Task SaveOrder(DateTime date, Order order);
		Task<Order[]> GetOrdersByDate(DateTime date);
		Task DeleteOrder(DateTime date, string userName);
	}

	public class OrdersStore : IOrdersStore
	{
		private readonly ApplicationDbContext _dbContext;
		private const string DateFormat = "yyyy-MM-dd";

		public OrdersStore(ApplicationDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task SaveOrder(DateTime date, Order order)
		{
			var dateStr = date.ToString(DateFormat);
			var existing = await _dbContext.Orders.FindAsync(dateStr, order.UserName);

			var orderJson = JsonConvert.SerializeObject(order);
			if (existing != null)
			{
				existing.OrderJson = orderJson;
			}
			else
			{
				_dbContext.Orders.Add(new OrderStore { Date = dateStr, UserName = order.UserName, OrderJson = orderJson });
			}

			await _dbContext.SaveChangesAsync();
		}

		public async Task<Order[]> GetOrdersByDate(DateTime date)
		{
			var dateStr = date.ToString(DateFormat);

			var serializedOrders = await _dbContext.Orders.Where(o => o.Date == dateStr).ToArrayAsync();
			var orders = serializedOrders.Select(o => JsonConvert.DeserializeObject<Order>(o.OrderJson)).ToArray();
			return orders;
		}

		public async Task DeleteOrder(DateTime date, string userName)
		{
			var dateStr = date.ToString(DateFormat);

			var existing = await _dbContext.Orders.FindAsync(dateStr, userName);
			if (existing != null)
			{
				_dbContext.Orders.Remove(existing);
				await _dbContext.SaveChangesAsync();
			}
		}
	}
}
