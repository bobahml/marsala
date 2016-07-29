using System.Threading.Tasks;
using Common.Model;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using WebApplication1.Hubs;

namespace WebApplication1.Services
{
	public interface IClientInterationService
	{
		void NotifyAllAboutNewMenu();
		void NewOrderAdded(Order order);
	}

	class ClientInterationService : IClientInterationService
	{
		private readonly IConnectionManager _connectionManager;

		public ClientInterationService(IConnectionManager connectionManager)
		{
			_connectionManager = connectionManager;
		}


		public void NotifyAllAboutNewMenu()
		{
			var ctx = _connectionManager.GetHubContext<MessagesHub>();

			ctx.Clients.All.FoodUpdated();
		}

		public void NewOrderAdded(Order order)
		{
			var ctx = _connectionManager.GetHubContext<MessagesHub>();

			ctx.Clients.All.OrderUpdated(order);
		}
	}
}