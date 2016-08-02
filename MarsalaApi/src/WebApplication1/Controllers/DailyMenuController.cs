using Common.Model;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
	[Route("api/[controller]")]
	public class DailyMenuController : Controller
	{
        private readonly IMenuService _menuService;

        public DailyMenuController(IMenuService menuService)
		{
            _menuService = menuService;
        }


		[HttpGet]
		public DailyMenu GetTodaysMenu()
		{
            return _menuService.GetTodaysMenu();
		}
	}
}
