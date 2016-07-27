using CommonLogic;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Novacode;
using Common.Model;

namespace Common.Services
{
	public interface IFileParser
	{
		ICollection<DailyMenu> ProcessLocalFile(string fileName);
		ICollection<DailyMenu> ProcessStreamFile(Stream file, string ext);
		Stream GenerateSummary(Summary summary);
	}


	public class FileParser : IFileParser
	{
		private readonly TextMenuParser _menuParser;

		public FileParser()
		{
			_menuParser = new TextMenuParser();
		}

		public ICollection<DailyMenu> ProcessLocalFile(string fileName)
		{
			var ext = Path.GetExtension(fileName)?.ToLower();
			if (string.IsNullOrEmpty(ext))
				return new DailyMenu[0];

			ICollection<DailyMenu> menuList;
			if (ext == ".docx" || ext == ".doc")
			{
				var docText = GetDocFileText(fileName);
				menuList = _menuParser.Parse(docText);
			}
			else
			{
				menuList = ParseXlsFile(fileName);
			}

			return menuList;
		}

		public ICollection<DailyMenu> ProcessStreamFile(Stream file, string ext)
		{
			ICollection<DailyMenu> menuList;
			if (ext == ".docx" || ext == ".doc")
			{
				var docText = GetDocFileText(file);
				menuList = _menuParser.Parse(docText);
			}
			else
			{
				menuList = ParseExcelFromStream(file);
			}

			return menuList;
		}

		public Stream GenerateSummary(Summary summary)
		{
			var stream = new MemoryStream();
			using (var doc = DocX.Create(stream))
			{
				AddListToDocument(doc, summary.Salad);
				AddListToDocument(doc, summary.Soup);
				AddListToDocument(doc, summary.MainCourse);
				AddListToDocument(doc, summary.Drink);

				doc.Save();
			}
			stream.Position = 0;

			return stream;
		}

		private static void AddListToDocument(DocX doc, IEnumerable<Course> coll)
		{
			var list = doc.AddList(listType: ListItemType.Bulleted);
			foreach (var c in coll)
				doc.AddListItem(list, $"{c.Name} : {c.Count}");

			doc.InsertList(list);
			doc.InsertParagraph();
		}


		#region private
		private static string GetDocFileText(Stream file)
		{
			using (var doc = DocX.Load(file))
			{
				var text = doc.Text;
				return text;
			}
		}

		private static string GetDocFileText(string fileName)
		{
			try
			{
				using (var doc = DocX.Load(fileName))
				{
					var text = doc.Text;
					return text;
				}
			}
			catch (IOException)
			{
				var tempName = Path.GetTempFileName();
				File.Copy(fileName, tempName, true);

				string text;
				using (var doc = DocX.Load(tempName))
					text = doc.Text;

				File.Delete(tempName);

				return text;
			}
		}

		private static ICollection<DailyMenu> ParseXlsFile(string fileName)
		{
			try
			{
				using (var stream = new FileStream(fileName, FileMode.Open))
				{
					return ParseExcelFromStream(stream);
				}
			}
			catch (IOException)
			{
				var tempName = Path.GetTempFileName();
				File.Copy(fileName, tempName, true);

				ICollection<DailyMenu> res;
				using (var stream = new FileStream(tempName, FileMode.Open))
				{
					res = ParseExcelFromStream(stream);
				}

				File.Delete(tempName);

				return res;
			}
		}

		private static ICollection<DailyMenu> ParseExcelFromStream(Stream stream)
		{
			var workbook = new XlsxReader(stream);
			var lunchSheetName = workbook.WorksheetNames.FirstOrDefault(s => s.ToLower().Contains("бизнес"));
			var lunchSheet = workbook[lunchSheetName];

			var rows = lunchSheet.Rows.ToArray();

			var result = new DailyMenu();

			double d;
			if (double.TryParse(rows[0].FirstOrDefault().Value, out d))
				result.Header = DateTime.FromOADate(d).Date.ToShortDateString();

			result.Salad = new[]
			{
				rows[3].ElementAt(1).Value,
				rows[4].ElementAt(1).Value,
				rows[5].ElementAt(1).Value,
			};


			result.Soup = new[]
			{
				rows[7].ElementAt(1).Value,
				rows[8].ElementAt(1).Value,
				rows[9].ElementAt(1).Value,
			};


			result.MainCourse = new[]
			{
				rows[11].ElementAt(1).Value,
				rows[12].ElementAt(1).Value,
				rows[13].ElementAt(1).Value,
			};

			result.Drink = new[]
			{
				rows[15].ElementAt(1).Value,
				rows[16].ElementAt(1).Value,
				rows[17].ElementAt(1).Value,
			};

			return new[] { result };
		}
		#endregion private

	}
}
