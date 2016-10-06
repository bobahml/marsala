using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Common.Model;

namespace WebApplication1.Services
{
	public interface IMenuService
	{
		DateTime? LastUpdateDate { get; }

		void SetActualMenu(ICollection<DailyMenu> result, DateTime startDate);
		DailyMenu GetTodaysMenu();

		DailyMenu[] GetAllMenus();
	}


	public class MenuService : IMenuService
	{
		private readonly IClientInterationService _clientInterationService;
		private readonly Dictionary<string, DailyMenu> _menus;
		private const string DateFormat = "yyyy-MM-dd";

		public MenuService(IClientInterationService clientInterationService)
		{
			_clientInterationService = clientInterationService;
			_menus = new Dictionary<string, DailyMenu>();
		}


		public DateTime? LastUpdateDate { get; private set; }

		public void SetActualMenu(ICollection<DailyMenu> actualMenu, DateTime date)
		{
			if (actualMenu.Count == 0)
				return;

			_menus.Clear();

			var startDate = date.Date;
			LastUpdateDate = startDate;

			foreach (var m in actualMenu)
			{
				if (string.IsNullOrEmpty(m.Header))
					m.Header = startDate.ToString("d MMMM (dddd)");

				_menus.Add(startDate.ToString(DateFormat), m);
				startDate = startDate.AddDays(1);
			}

			_clientInterationService.NotifyFoodUpdated();
		}

		public DailyMenu GetTodaysMenu()
		{
			var date = DateTime.Now.Date;

			if (_menus.Count == 0)
				return new DailyMenu { Header = date.ToString("d MMMM (dddd)") };

			var key = date.ToString(DateFormat);
			DailyMenu m;
			if (_menus.TryGetValue(key, out m))
				return m;


			var mindiff = _menus
				.OrderBy(p => Math.Abs((DateTime.ParseExact(p.Key, DateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None) - date).TotalSeconds))
					.First();

			return mindiff.Value;
		}

		public DailyMenu[] GetAllMenus()
		{
			return _menus.Values.ToArray();
		}
	}
}
