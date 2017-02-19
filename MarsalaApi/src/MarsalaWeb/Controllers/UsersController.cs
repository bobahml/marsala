using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Auth.Model;

namespace Angular2WebpackVisualStudio.Controllers
{
	[Route("api/[controller]")]
	public class UsersController : Controller
	{
		private readonly UserManager<ApplicationUser> _userManager;

		public UsersController(UserManager<ApplicationUser> userManager)
		{
			_userManager = userManager;
		}

		[HttpGet]
		public async Task<IActionResult> GetAllUsers()
		{
			var result = await _userManager.Users.Select(u=>u.UserName).ToArrayAsync();
			return Ok(result);
		}
	}
}
