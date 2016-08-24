using Common.Model;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;


namespace WebApplication1.Controllers
{
	[Route("api/[controller]")]
	public class OrderController : Controller
	{
		private readonly IOrderService _orderService;

		public OrderController(IOrderService orderService)
		{
			_orderService = orderService;
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
	}

}
