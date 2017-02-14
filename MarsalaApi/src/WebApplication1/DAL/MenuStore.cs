using Common.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.DAL
{
	public interface IMenuStore
	{
		Task AddMenu(IReadOnlyDictionary<string, DailyMenu> items);
		Task<DailyMenu> GetMenuByDate(DateTime date);
	}

	public class MenuStore : IMenuStore
	{
		private readonly ApplicationDbContext _dbContext;

		public MenuStore(ApplicationDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task AddMenu(IReadOnlyDictionary<string, DailyMenu> items)
		{
			foreach (var item in items)
			{
				var menuJson = JsonConvert.SerializeObject(item.Value);
				var existing = await _dbContext.DaylyMenus.FindAsync(item.Key);
				if (existing != null)
					existing.MenuJson = menuJson;
				else
					_dbContext.DaylyMenus.Add(new DaylyMenuStore { Date = item.Key, MenuJson = menuJson });
			}

			await _dbContext.SaveChangesAsync();
		}

		public async Task<DailyMenu> GetMenuByDate(DateTime date)
		{
			var dateStr = date.ToString("yyyy-MM-dd");

			var serialized = await _dbContext.DaylyMenus.FindAsync(dateStr);

			if (serialized != null)
			{
				return JsonConvert.DeserializeObject<DailyMenu>(serialized.MenuJson);
			}
			else
			{
				return null;
			}
		}
	}
}
