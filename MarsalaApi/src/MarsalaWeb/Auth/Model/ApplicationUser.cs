using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace MarsalaWeb.Auth.Model
{
	public class ApplicationUser : IdentityUser
	{
		public string Company { get; set; }   
	}
}
