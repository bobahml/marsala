using System;
using System.Linq;
using Common.Services;
using NUnit.Framework;

namespace Common.Tests
{
	[TestFixture]
	public class CustomDateParserTest
	{
		[Test]
		public void T01()
		{
			var dates = CustomDateParser.TryParseStartDateFromSubject("Меню Бизнес-ланча 31.10+1.11.2016").ToArray();

			Assert.AreEqual(2, dates.Length);
			Assert.AreEqual(new DateTime(2016, 10, 31, 0, 0, 0, DateTimeKind.Local), dates[0]);
			Assert.AreEqual(new DateTime(2016, 11, 1, 0, 0, 0, DateTimeKind.Local), dates[1]);
		}

		[Test]
		public void T02()
		{
			var dates = CustomDateParser.TryParseStartDateFromSubject("Меню бизнес ланч 12 и 13.12.2016").ToArray();

			Assert.AreEqual(2, dates.Length);
			Assert.AreEqual(new DateTime(2016, 12, 12, 0, 0, 0, DateTimeKind.Local), dates[0]);
			Assert.AreEqual(new DateTime(2016, 12, 13, 0, 0, 0, DateTimeKind.Local), dates[1]);
		}


		[Test]
		public void T03()
		{
			var dates = CustomDateParser.TryParseStartDateFromSubject("Меню бизнес ланч 9.12.2016").ToArray();

			Assert.AreEqual(1, dates.Length);
			Assert.AreEqual(new DateTime(2016, 12, 9, 0, 0, 0, DateTimeKind.Local), dates[0]);
		}


		[Test]
		public void T04()
		{
			var dates = CustomDateParser.TryParseStartDateFromSubject("Бизнес Ланч 05-06.12.2016").ToArray();

			Assert.AreEqual(2, dates.Length);
			Assert.AreEqual(new DateTime(2016, 12, 5, 0, 0, 0, DateTimeKind.Local), dates[0]);
			Assert.AreEqual(new DateTime(2016, 12, 6, 0, 0, 0, DateTimeKind.Local), dates[1]);
		}

		[Test]
		public void T05()
		{
			var dates = CustomDateParser.TryParseStartDateFromSubject("Бизнес ланч 30.11 и 01.12.2016").ToArray();

			Assert.AreEqual(2, dates.Length);
			Assert.AreEqual(new DateTime(2016, 11, 30, 0, 0, 0, DateTimeKind.Local), dates[0]);
			Assert.AreEqual(new DateTime(2016, 12, 1, 0, 0, 0, DateTimeKind.Local), dates[1]);
		}

		[Test]
		public void T06()
		{
			var dates = CustomDateParser.TryParseStartDateFromSubject("Меню бизнес ланч 16.11 и на 17.11").ToArray();

			Assert.AreEqual(2, dates.Length);
			Assert.AreEqual(new DateTime(DateTime.Now.Year, 11, 16, 0, 0, 0, DateTimeKind.Local), dates[0]);
			Assert.AreEqual(new DateTime(DateTime.Now.Year, 11, 17, 0, 0, 0, DateTimeKind.Local), dates[1]);
		}

		[Test]
		public void T07()
		{
			var dates = CustomDateParser.TryParseStartDateFromSubject("Меню Бизнес Ланч 07-08.12.2016").ToArray();

			Assert.AreEqual(2, dates.Length);
			Assert.AreEqual(new DateTime(2016, 12, 7, 0, 0, 0, DateTimeKind.Local), dates[0]);
			Assert.AreEqual(new DateTime(2016, 12, 8, 0, 0, 0, DateTimeKind.Local), dates[1]);
		}


		[Test]
		public void T08()
		{
			var dates = CustomDateParser.TryParseStartDateFromSubject("Меню бизнес ланч 19 и 20.12.2016").ToArray();

			Assert.AreEqual(2, dates.Length);
			Assert.AreEqual(new DateTime(2016, 12, 19, 0, 0, 0, DateTimeKind.Local), dates[0]);
			Assert.AreEqual(new DateTime(2016, 12, 20, 0, 0, 0, DateTimeKind.Local), dates[1]);
		}


		[Test]
		public void T09()
		{
			var dates = CustomDateParser.TryParseStartDateFromSubject("Меню БЛ на один день 07.10").ToArray();

			Assert.AreEqual(1, dates.Length);
			Assert.AreEqual(new DateTime(DateTime.Now.Year, 10, 7, 0, 0, 0, DateTimeKind.Local), dates[0]);
		}


		[Test]
		public void T10()
		{
			var dates = CustomDateParser.TryParseStartDateFromSubject("БИЗНЕС ЛАНЧ!!!  05.10 и 06.10").ToArray();

			Assert.AreEqual(2, dates.Length);
			Assert.AreEqual(new DateTime(DateTime.Now.Year, 10, 5, 0, 0, 0, DateTimeKind.Local), dates[0]);
			Assert.AreEqual(new DateTime(DateTime.Now.Year, 10, 6, 0, 0, 0, DateTimeKind.Local), dates[1]);
		}

		[Test]
		public void T11()
		{
			var dates = CustomDateParser.TryParseStartDateFromSubject("БИЗНЕС ЛАНЧ!!! на 1-2.11").ToArray();

			Assert.AreEqual(2, dates.Length);
			Assert.AreEqual(new DateTime(DateTime.Now.Year, 11, 1, 0, 0, 0, DateTimeKind.Local), dates[0]);
			Assert.AreEqual(new DateTime(DateTime.Now.Year, 11, 2, 0, 0, 0, DateTimeKind.Local), dates[1]);
		}
	}
}
