using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApplication1.Auth.Model;
using WebApplication1.Services.Mail;

namespace WebApplication1.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	public class AccountController : Controller
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly IMailWorker _mailWorker;
		private readonly ILogger _logger;

		public AccountController(
			UserManager<ApplicationUser> userManager,
			SignInManager<ApplicationUser> signInManager,
			IMailWorker mailWorker,
			ILoggerFactory loggerFactory)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_mailWorker = mailWorker;
			_logger = loggerFactory.CreateLogger<AccountController>();
		}


		[HttpPost]
		[AllowAnonymous]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Register(RegisterViewModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);


			var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
			var result = await _userManager.CreateAsync(user, model.Password);
			if (result.Succeeded)
			{
				var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
				var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, HttpContext.Request.Scheme);
				_mailWorker.SendEmail(model.Email, "Confirm your account", $"Please confirm your account by clicking this link: <a href=\"{callbackUrl}\">link</a>");
				_logger.LogInformation($"User created a new account {model.Email} with password.");
			}
			return Ok();
		}

		[HttpGet]
		[Route("ConfirmEmail")]
		[AllowAnonymous]
		public async Task<IActionResult> ConfirmEmail(string userid, string code)
		{
			var user = await _userManager.FindByIdAsync(userid);
			if (user == null)
			{
				ModelState.AddModelError(string.Empty, "Invalid user Id.");
				return BadRequest(ModelState);
			}

			var res = await _userManager.ConfirmEmailAsync(user, code);
			if (!res.Succeeded)
			{
				ModelState.AddModelError(string.Empty, "Invalid user code.");
				return BadRequest(ModelState);
			}
			return Redirect(Url.Content("index.html"));
		}



		[Route("Login")]
		[HttpPost]
		[AllowAnonymous]
		public async Task<IActionResult> Login([FromBody]LoginViewModel model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var user = await _userManager.FindByNameAsync(model.Email);
			if (user != null)
			{
				if (!await _userManager.IsEmailConfirmedAsync(user))
				{
					ModelState.AddModelError(string.Empty, "You must have a confirmed email to log in.");
					return BadRequest(ModelState);
				}
			}

			var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
			if (result.Succeeded)
			{
				_logger.LogInformation($"User {model.Email} logged in.");
				return Ok(new UserViewModel { Token = "asdasdasdas" });
			}
			if (result.IsLockedOut)
			{
				_logger.LogWarning("User account locked out.");
				return Unauthorized();
			}
			else
			{
				ModelState.AddModelError(string.Empty, "Invalid login attempt.");
				return BadRequest(ModelState);
			}
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> LogOff()
		{
			await _signInManager.SignOutAsync();
			_logger.LogInformation($"User {User.Identity.Name} logged out.");
			return Ok();
		}


	}
}
