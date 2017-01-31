using System;
using Common.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebApplication1.Auth;
using WebApplication1.Auth.Model;
using WebApplication1.DAL;
using WebApplication1.Services;
using WebApplication1.Services.Mail;

namespace WebApplication1
{
	public class Startup
	{
		public IConfigurationRoot Configuration { get; set; }


		public Startup(IHostingEnvironment env)
		{
			// Set up configuration sources.
			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json");

			Configuration = builder.Build();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
		{
			loggerFactory.AddConsole(Configuration.GetSection("Logging"));
			loggerFactory.AddAzureWebAppDiagnostics(); // for default setting.

			if (env.IsDevelopment())
				app.UseDeveloperExceptionPage();
			
			app.UseDefaultFiles();
			app.UseStaticFiles();


		



			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action}/{id?}");
			});

			app.UseSignalR("/signalr");

		}

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			// Setup options with DI
			services.AddOptions();

			// Configure MailSettings using a sub-section of the appsettings.json file
			services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
			
			// Add framework services.
			services.AddMvc();
			services.AddSignalR();

			services.AddLogging();

			services.AddSingleton<IFileParser, FileParser>();
			services.AddSingleton<IMenuService, MenuService>();
			services.AddSingleton<IOrderService, OrderService>();
			services.AddSingleton<IClientInterationService, ClientInterationService>();
			services.AddSingleton<IMailWorker, MailWorker>();

			//AUTH
			SetupAuthentificationServices(services);
			}

		private void SetupAuthentificationServices(IServiceCollection services)
		{
			services.AddEntityFramework()
				.AddEntityFrameworkSqlite()
				.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

			services.AddIdentity<ApplicationUser, IdentityRole>()
				.AddEntityFrameworkStores<ApplicationDbContext>()
				.AddDefaultTokenProviders();

			services.Configure<IdentityOptions>(options =>
			{
				// Password settings
				options.Password.RequireDigit = true;
				options.Password.RequiredLength = 6;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequireUppercase = false;
				options.Password.RequireLowercase = false;

				// Lockout settings
				options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
				options.Lockout.MaxFailedAccessAttempts = 10;

				// Cookie settings
				options.Cookies.ApplicationCookie.ExpireTimeSpan = TimeSpan.FromDays(150);
				options.Cookies.ApplicationCookie.LoginPath = "/Account/Login";
				options.Cookies.ApplicationCookie.LogoutPath = "/Account/LogOff";

				// User settings
				options.User.RequireUniqueEmail = true;
			});
		}

		private static SqliteConnection GetCs()
		{
			var connectionStringBuilder = new SqliteConnectionStringBuilder { DataSource = "MyDb.db" };
			var connectionString = connectionStringBuilder.ToString();
			var connection = new SqliteConnection(connectionString);

			return connection;
		}
	}
}
