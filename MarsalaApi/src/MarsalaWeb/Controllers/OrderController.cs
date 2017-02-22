using System.Security.Claims;
using System.Threading.Tasks;
using Common.Model;
using Microsoft.AspNetCore.Mvc;
using MarsalaWeb.Services;

namespace MarsalaWeb.Controllers
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
		public async Task<IActionResult> PostOrder([FromBody]Order order)
		{
			await _orderService.MakeAnOrder(order);
			return Accepted();
		}

		[HttpDelete]
		[Route("{userName}")]
		public Task<Summary> DeleteOrder(string userName)
		{
			return _orderService.DeleteOrder(userName);
		}

		[HttpGet]
		[Route("summary")]
		public Task<Summary> GetSummary()
		{
			return _orderService.GetSummary();
		}

		[HttpPost]
		[Route("send")]
		public async Task<IActionResult> SendSummary()
		{
			var currentUser = HttpContext.User.FindFirst(ClaimTypes.Name).Value;
			await _orderService.StartOrderSending(currentUser);
			return Ok();
		}
	}
}
