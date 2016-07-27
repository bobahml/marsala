using Catel.Data;

namespace MenuParser.Models
{
	public class MenuSet : ModelBase
	{
		#region Properties


		#region Salad property

		/// <summary>
		/// Gets or sets the Salad value.
		/// </summary>
		public string Salad
		{
			get { return GetValue<string>(SaladProperty); }
			set { SetValue(SaladProperty, value); }
		}

		/// <summary>
		/// Salad property data.
		/// </summary>
		public static readonly PropertyData SaladProperty = RegisterProperty("Salad", typeof (string));

		#endregion

		#region Soup property

		/// <summary>
		/// Gets or sets the Soup value.
		/// </summary>
		public string Soup
		{
			get { return GetValue<string>(SoupProperty); }
			set { SetValue(SoupProperty, value); }
		}

		/// <summary>
		/// Soup property data.
		/// </summary>
		public static readonly PropertyData SoupProperty = RegisterProperty("Soup", typeof (string));

		#endregion

		#region MainCourse property

		/// <summary>
		/// Gets or sets the MainCourse value.
		/// </summary>
		public string MainCourse
		{
			get { return GetValue<string>(MainCourseProperty); }
			set { SetValue(MainCourseProperty, value); }
		}

		/// <summary>
		/// MainCourse property data.
		/// </summary>
		public static readonly PropertyData MainCourseProperty = RegisterProperty("MainCourse", typeof (string));

		#endregion

		#region Drink property

		/// <summary>
		/// Gets or sets the Drink value.
		/// </summary>
		public string Drink
		{
			get { return GetValue<string>(DrinkProperty); }
			set { SetValue(DrinkProperty, value); }
		}

		/// <summary>
		/// Drink property data.
		/// </summary>
		public static readonly PropertyData DrinkProperty = RegisterProperty("Drink", typeof (string));

		#endregion


		#endregion

		public override string ToString()
		{
			return $"{Salad} | {Soup} | {MainCourse} | {Drink}";
		}
	}


}