using Common.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
	[Route("api/[controller]")]
	public class FilesController : Controller
	{
		private readonly IHostingEnvironment _appEnvironment;
		private readonly IFileParser _fileParser;
		private readonly IOrderService _orderService;

		public FilesController(
			IHostingEnvironment appEnvironment,
			IFileParser fileParser,
			IOrderService orderService)
		{
			_appEnvironment = appEnvironment;
			_fileParser = fileParser;
			_orderService = orderService;
		}

		[HttpGet]
		[Route("offlineClient")]
		public IActionResult GetOfflineClient()
		{
			const string fileName = "MenuParserWpfClient.zip";
			var filePath = Path.Combine(_appEnvironment.ContentRootPath, "Files", fileName);
			const string fileType = "application/zip";

			return new PhysicalFileResult(filePath, fileType) { FileDownloadName = fileName };
		}


		[HttpGet]
		[Route("summary")]
		public async Task<IActionResult> GetSummary()
		{
			var summary = await _orderService.GetSummary();

			var stream = _fileParser.GenerateSummary(summary);

			var fileName = $"{DateTime.Now.ToString("yyyy-dd-M")}.docx";
			const string fileType = "application/msword";

			return new FileStreamResult(stream, fileType) { FileDownloadName = fileName };
		}
	}
}
