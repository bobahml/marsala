using System.Linq;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;
using System.Globalization;
using Common.Services;

namespace WebApplication1.Controllers
{
	[Route("api/[controller]")]
	public class ParsingController : Controller
	{
		private readonly IFileParser _fileParser;
        private readonly IMenuService _menuService;

        public ParsingController(IFileParser fileParser, IMenuService menuService)
		{
			_fileParser = fileParser;
            _menuService = menuService;
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

			var first = files.Files[0];
            var ext = System.IO.Path.GetExtension(first.FileName ?? "unknown.docx");

            using (var stream = first.OpenReadStream())
			{
				var result = _fileParser.ProcessStreamFile(stream, ext);

                if (result.Any())
                {
                    _menuService.SetActualMenu(result, startDate);
                }

				return Ok(result);
			}
		}

	}
}