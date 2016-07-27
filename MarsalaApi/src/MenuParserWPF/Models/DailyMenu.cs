using System.Collections.Generic;
using System.Linq;
using Catel.Data;
using Catel.MVVM;

namespace MenuParser.Models
{
	public class DailyMenu : ModelBase
	{
		public DailyMenu()
		{
			
		}

		public DailyMenu(Common.Model.DailyMenu dailyMenu)
		{
			Header = dailyMenu.Header;
			MainCourse = dailyMenu.MainCourse;
			Salad = dailyMenu.Salad;
			Soup = dailyMenu.Soup;
			Drink = dailyMenu.Drink;

			MenuSet.Salad = Salad.FirstOrDefault();
			MenuSet.Soup = Soup.FirstOrDefault();
			MenuSet.MainCourse = MainCourse.FirstOrDefault();
			MenuSet.Drink = Drink.FirstOrDefault();
		}




		#region Header property

		/// <summary>
		/// Gets or sets the Header value.
		/// </summary>
		public string Header
		{
			get { return GetValue<string>(HeaderProperty); }
			set { SetValue(HeaderProperty, value); }
		}

		/// <summary>
		/// Header property data.
		/// </summary>
		public static readonly PropertyData HeaderProperty = RegisterProperty("Header", typeof (string), "Day");

		#endregion

		#region MenuSet property

		/// <summary>
		/// Gets or sets the MenuSet value.
		/// </summary>
		public MenuSet MenuSet
		{
			get { return GetValue<MenuSet>(MenuSetProperty); }
			set { SetValue(MenuSetProperty, value); }
		}

		/// <summary>
		/// MenuSet property data.
		/// </summary>
		public static readonly PropertyData MenuSetProperty = RegisterProperty("MenuSet", typeof (MenuSet),() => new MenuSet());

		#endregion	
		
		
		#region Salad property

		/// <summary>
		/// Gets or sets the Salad value.
		/// </summary>
		public ICollection<string>	Salad
		{
			get { return GetValue<ICollection<string>>(SaladProperty); }
			set { SetValue(SaladProperty, value); }
		}

		/// <summary>
		/// Salad property data.
		/// </summary>
		public static readonly PropertyData SaladProperty = RegisterProperty("Salad", typeof (ICollection<string>));

		#endregion
		
		#region Soup property

		/// <summary>
		/// Gets or sets the Soup value.
		/// </summary>
		public ICollection<string> Soup
		{
			get { return GetValue<ICollection<string> >(SoupProperty); }
			set { SetValue(SoupProperty, value); }
		}

		/// <summary>
		/// Soup property data.
		/// </summary>
		public static readonly PropertyData SoupProperty = RegisterProperty("Soup", typeof (ICollection<string> ));

		#endregion
		
		#region MainCourse property

		/// <summary>
		/// Gets or sets the MainCourse value.
		/// </summary>
		public ICollection<string> MainCourse
		{
			get { return GetValue<ICollection<string> >(MainCourseProperty); }
			set { SetValue(MainCourseProperty, value); }
		}

		/// <summary>
		/// MainCourse property data.
		/// </summary>
		public static readonly PropertyData MainCourseProperty = RegisterProperty("MainCourse", typeof (ICollection<string> ));

		#endregion

		#region Drink property

		/// <summary>
		/// Gets or sets the Drink value.
		/// </summary>
		public ICollection<string> Drink
		{
			get { return GetValue<ICollection<string>>(DrinkProperty); }
			set { SetValue(DrinkProperty, value); }
		}

		/// <summary>
		/// Drink property data.
		/// </summary>
		public static readonly PropertyData DrinkProperty = RegisterProperty("Drink", typeof (ICollection<string>));

		#endregion


		#region Clear command

		private Command _clearCommand;

		/// <summary>
		/// Gets the Clear command.
		/// </summary>
		public Command ClearCommand
		{
			get { return _clearCommand ?? (_clearCommand = new Command(Clear)); }
		}

		/// <summary>
		/// Method to invoke when the Clear command is executed.
		/// </summary>
		private void Clear()
		{
			MenuSet.Salad = null;
			MenuSet.Soup = null;
			MenuSet.MainCourse = null;
			MenuSet.Drink = null;
		}

		#endregion	
	}
}
