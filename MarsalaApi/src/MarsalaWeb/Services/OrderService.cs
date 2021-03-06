﻿using System;
using Common.Model;
using MarsalaWeb.Services.Mail;
using System.Threading.Tasks;
using MarsalaWeb.DAL;

namespace MarsalaWeb.Services
{
	public interface IOrderService
	{
		Task MakeAnOrder(Order order);
		Task<Summary> GetSummary();
		Task<Summary> DeleteOrder(string userName);
		void StartOrderSending(string senderName, SummaryText summaryText);
		OrderSentStatus GetStatus();
	}


	public class OrderService : IOrderService
	{
		private readonly IClientInterationService _clientInterationService;
		private readonly IMailWorker _mailWorker;
		private readonly IOrdersStore _ordersStore;
		private readonly DateTime _orderDate = DateTime.Now.Date;
		private static OrderSentStatus _lastSendStatus = new OrderSentStatus
		{
			StatusText = "Not sent",
			SenderName = "Nobody",
			IsSuccess = false
		};

		public OrderService(IClientInterationService clientInterationService, IMailWorker mailWorker, IOrdersStore ordersStore)
		{
			_clientInterationService = clientInterationService;
			_mailWorker = mailWorker;
			_ordersStore = ordersStore;
		}

		public async Task MakeAnOrder(Order order)
		{
			await _ordersStore.SaveOrder(_orderDate, order);
			_clientInterationService.NotifyOrderUpdated(order);
		}

		public async Task<Summary> GetSummary()
		{
			var orders = await _ordersStore.GetOrdersByDate(_orderDate);
			var summary = SummaryHelper.GenerateSummary(orders);
			return summary;
		}

		public async Task<Summary> DeleteOrder(string userName)
		{
			await _ordersStore.DeleteOrder(_orderDate, userName);
			var summary = await GetSummary();
			return summary;
		}

		public void StartOrderSending(string senderName, SummaryText summaryText)
		{
			_lastSendStatus = new OrderSentStatus
			{
				SenderName = senderName,
				StatusText = "Sending in progress",
				IsSuccess = false,
				SentDate = DateTime.UtcNow,
			};

			_mailWorker.SendAsync("Заказ бизнес ланч", summaryText.OrderText, result =>
			{
				var status = new OrderSentStatus
				{
					SenderName = senderName,
					StatusText = result.StatusText,
					IsSuccess = result.IsSuccess,
					SentDate = DateTime.UtcNow,
				};
				_lastSendStatus = status;
				_clientInterationService.NotifyOrderSent(status);
			});
		}

		public OrderSentStatus GetStatus()
		{
			return _lastSendStatus;
		}
	}
}
