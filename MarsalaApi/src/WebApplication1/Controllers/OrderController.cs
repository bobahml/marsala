using System;
using Common.Model;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;


namespace WebApplication1.Controllers
{
	[Route("api/[controller]")]
	public class OrderController : Controller
	{
		private readonly IOrderService _orderService;
		private readonly IMailWorker _mailWorker;

		public OrderController(IOrderService orderService, IMailWorker mailWorker)
		{
			_orderService = orderService;
			_mailWorker = mailWorker;
		}

		[HttpPost]
		public Order PostOrder([FromBody]Order order)
		{
			_orderService.MakeAnOrder(order);
			return order;
		}

		[HttpDelete]
		[Route("{userName}")]
		public Summary DeleteOrder(string userName)
		{
			var summary = _orderService.DeleteOrder(userName);
			return summary;
		}

		[HttpGet]
		[Route("summary")]
		public Summary GetSummary()
		{
			return _orderService.GetSummary();
		}

		[HttpPost]
		[Route("send")]
		public IActionResult SendSummary()
		{
			var summary = _orderService.GetSummary();
			try
			{
				//"marsala.restaurant@ya.ru"
				_mailWorker.Send("bobahml@mail.ru", "Заказ бизнес ланч", summary.OrderText);
			}
			catch (Exception e)
			{
				summary.OrderText = e.Message;
			}
	

			return Ok(summary);
		}

	}

}
