using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Common.Model;
using WebApplication1.DAL;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
	public interface IMenuService
	{
		Task SetActualMenu(ICollection<DailyMenu> result, DateTime startDate);
		Task<DailyMenu> GetTodaysMenu();
	}

	public class MenuService : IMenuService
	{
		private readonly IClientInterationService _clientInterationService;
		private readonly IMenuStore _menuStore;
		private const string DateFormat = "yyyy-MM-dd";

		public MenuService(IClientInterationService clientInterationService, IMenuStore menuStore)
		{
			_clientInterationService = clientInterationService;
			_menuStore = menuStore;
		}

		public async Task SetActualMenu(ICollection<DailyMenu> actualMenu, DateTime date)
		{
			if (actualMenu.Count == 0)
				return;

			var startDate = date.Date;
			var menus = new Dictionary<string, DailyMenu>();
			foreach (var m in actualMenu)
			{
				if (string.IsNullOrEmpty(m.Header))
					m.Header = startDate.ToString("d MMMM (dddd)");

				menus.Add(startDate.ToString(DateFormat), m);
				startDate = startDate.AddDays(1);
			}

			await _menuStore.AddMenu(menus);
			_clientInterationService.NotifyFoodUpdated();
		}

		public async Task<DailyMenu> GetTodaysMenu()
		{
			var now = DateTime.Now.Date;
			var manu = await _menuStore.GetMenuByDate(now);
			if (manu != null)
				return manu;

			return new DailyMenu { Header = now.ToString("d MMMM (dddd)") };
		}		
	}
}
