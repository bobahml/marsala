using Common.Model;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;


namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderSerevice;
	    private readonly IClientInterationService _clientInterationService;

	    public OrderController(IOrderService orderSerevice, IClientInterationService clientInterationService )
	    {
		    _orderSerevice = orderSerevice;
		    _clientInterationService = clientInterationService;
	    }

	    [HttpPost]
        public Order PostOrder([FromBody]Order order)
        {
            _orderSerevice.MakeAnOrder(order);
			_clientInterationService.NewOrderAdded(order);
			return order;
        }

		[HttpDelete]
		[Route("{userName}")]
		public Summary DeleteOrder(string userName)
        {
			return _orderSerevice.DeleteOrder(userName);
        }

        [HttpGet]
        [Route("summary")]
        public Summary GetSummary([FromBody]Order order)
        {
            return _orderSerevice.GetSummary();
        }
    }

}
