using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApplication1.Auth;
using WebApplication1.Auth.Model;
using WebApplication1.Services.Mail;

namespace Angular2WebpackVisualStudio.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IMailWorker _mailWorker;
        private readonly ILogger _logger;
        private readonly IAuthService _authService;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IAuthService authService,
            IMailWorker mailWorker,
            ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mailWorker = mailWorker;
            _authService = authService;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }


        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new ApplicationUser { UserName = model.UserName, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, HttpContext.Request.Scheme);
                _mailWorker.SendAsync(model.Email, "Confirm Marsala account", $"<a href='{callbackUrl}'>Confirm Marsala account</a>", true);
                _logger.LogInformation($"User created a new account {model.Email} with password.");
                return Ok();
            }
            else
            {
                foreach (var item in result.Errors)
                {
                    ModelState.AddModelError(item.Code, item.Description);
                }
                return BadRequest(ModelState);
            }

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
                foreach (var item in res.Errors)
                {
                    ModelState.AddModelError(item.Code, item.Description);
                }
                return BadRequest(ModelState);
            }
            return LocalRedirect($"~/");
        }


        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                return BadRequest(ModelState);
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                ModelState.AddModelError(string.Empty, "You must have a confirmed email to log in.");
                return BadRequest(ModelState);
            }

            if (_userManager.SupportsUserLockout && await _userManager.IsLockedOutAsync(user))
            {
                ModelState.AddModelError(string.Empty, "The specified user cannot sign in.");
                return BadRequest(ModelState);
            }
            
            if (!await _userManager.CheckPasswordAsync(user, model.Password))
            {
                _logger.LogWarning("User account locked out.");
                return Unauthorized();
            }

            _logger.LogInformation($"User {model.UserName} logged in.");

            if (_userManager.SupportsUserLockout)
            {
                await _userManager.ResetAccessFailedCountAsync(user);
            }

            // Create the principal
            var principal = await _signInManager.CreateUserPrincipalAsync(user);
            var jwt = _authService.GenerateToken(principal.Claims);
            return Ok(new UserViewModel { UserId=user.Id, UserName = user.UserName, Email = user.Email, Token = jwt });
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
