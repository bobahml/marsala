using Common.Model;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;


namespace WebApplication1.Controllers
{
	[Route("api/[controller]")]
	public class OrderController : Controller
	{
		private readonly IOrderService _orderSerevice;

		public OrderController(IOrderService orderSerevice)
		{
			_orderSerevice = orderSerevice;
		}

		[HttpPost]
		public Order PostOrder([FromBody]Order order)
		{
			_orderSerevice.MakeAnOrder(order);
		
			return order;
		}

		[HttpDelete]
		[Route("{userName}")]
		public Summary DeleteOrder(string userName)
		{
			var summary = _orderSerevice.DeleteOrder(userName);
	
			return summary;
		}

		[HttpGet]
		[Route("summary")]
		public Summary GetSummary([FromBody]Order order)
		{
			return _orderSerevice.GetSummary();
		}
	}

}
