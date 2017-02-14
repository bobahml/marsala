using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Auth.Model;

namespace WebApplication1.DAL
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
	{
		public DbSet<DaylyMenuStore> DaylyMenus { get; set; }
		public DbSet<OrderStore> Orders { get; set; }

		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
				: base(options)
		{
		}


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<OrderStore>()
				.HasKey(c => new { c.Date, c.UserName });

			modelBuilder.Entity<DaylyMenuStore>()
				.HasKey(c => c.Date);
		}
	}
}
