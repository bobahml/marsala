using Microsoft.EntityFrameworkCore;

namespace MarsalaWeb.DAL
{
    public static class DbInitializer
    {
        public static void Initialize(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlite(connectionString);

            using (var ctx = new ApplicationDbContext(optionsBuilder.Options))
            {
                ctx.Database.Migrate();
            }
        }
    }
}
