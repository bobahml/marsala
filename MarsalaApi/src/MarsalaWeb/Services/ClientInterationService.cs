using Common.Model;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using MarsalaWeb.Hubs;

namespace MarsalaWeb.Services
{
	public interface IClientInterationService
	{
		void NotifyOrderSent(OrderSentStatus status);
		void NotifyFoodUpdated();
		void NotifyOrderUpdated(Order order);
	}

	internal class ClientInterationService : IClientInterationService
	{
		private readonly IConnectionManager _connectionManager;

		public ClientInterationService(IConnectionManager connectionManager)
		{
			_connectionManager = connectionManager;
		}

		public void NotifyFoodUpdated()
		{
			var ctx = _connectionManager.GetHubContext<MessagesHub>();
			ctx.Clients.All.FoodUpdated();
		}

		public void NotifyOrderSent(OrderSentStatus status)
		{
			var ctx = _connectionManager.GetHubContext<MessagesHub>();
			ctx.Clients.All.OrderSent(status);
		}

		public void NotifyOrderUpdated(Order order)
		{
			var ctx = _connectionManager.GetHubContext<MessagesHub>();
			ctx.Clients.All.OrderUpdated(order);
		}
	}
}