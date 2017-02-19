using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace WebApplication1.Auth.Model
{
	public class ApplicationUser : IdentityUser
	{
		public string Company { get; set; }   
	}
}
