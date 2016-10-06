using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using Common.Model;
using Common.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;
using WebApplication1.Services.Mail;

namespace WebApplication1.Controllers
{
	[Route("api/[controller]")]
	public class DailyMenuController : Controller
	{
		private readonly IMenuService _menuService;
		private readonly IFileParser _fileParser;
		private readonly IMailWorker _mailWorker;

		public DailyMenuController(IMenuService menuService, IFileParser fileParser, IMailWorker mailWorker)
		{
			_menuService = menuService;
			_fileParser = fileParser;
			_mailWorker = mailWorker;
		}

		[HttpGet]
		public DailyMenu GetTodaysMenu()
		{
			return _menuService.GetTodaysMenu();
		}


		[HttpPost]
		[Route("uploadByEmail")]
		public IActionResult UploadByEmail()
		{
			var file = _mailWorker.GetLastSupportedAttachment(null);
			if (file == null) //No fresh messages to parse
				return Ok(_menuService.GetAllMenus());

			var dates = TryParseStartDateFromSubject(file.MessageSubject).ToArray();
			var startDate = dates.Any() ? dates[0] : file.MessageDate.Date;

			var ext = System.IO.Path.GetExtension(file.FileName ?? "unknown.docx");

			var result = _fileParser.ProcessFile(file.Data, ext);

			if (result.Any())
			{
				_menuService.SetActualMenu(result, startDate);
				return Ok(result);
			}
			return BadRequest("Could not get a menu from a file");
		}

		[HttpPost]
		[Route("upload")]
		public IActionResult UploadFile([FromQuery]string date, IFormCollection files)
		{
			if (files.Files == null || files.Files.Count == 0)
				return BadRequest();

			DateTime startDate;
			if (!DateTime.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out startDate))
			{
				startDate = DateTime.Now.Date;
			}

			var file = files.Files[0];
			var ext = System.IO.Path.GetExtension(file.FileName ?? "unknown.docx");

			using (var stream = file.OpenReadStream())
			{
				var result = _fileParser.ProcessFile(stream, ext);

				if (result.Any())
				{
					_menuService.SetActualMenu(result, startDate);
					return Ok(result);
				}
			}

			return BadRequest("Could not get a menu from a file");
		}

		private static IEnumerable<DateTime> TryParseStartDateFromSubject(string message)
		{
			//Меню БЛ на один день 07.10
			//БИЗНЕС ЛАНЧ!!!  05.10 и 06.10
			var dateRegex = new Regex(@"\s\d{1,2}\.\d{1,2}");
			var matches = dateRegex.Matches(message);

			for (int i = 0; i < matches.Count; i++)
			{
				var match = matches[i];
				var d = match.Value.Trim();

				var parts = d.Split('.');


				var day = int.Parse(parts[0]);
				var month = int.Parse(parts[1]);

				if (day > 31 || month > 12)
					continue;

				yield return new DateTime(DateTime.Now.Year, month, day, 0, 0, 0, DateTimeKind.Local);
			}
		}
	}

}
