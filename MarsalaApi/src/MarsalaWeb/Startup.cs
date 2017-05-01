using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Common.Services;
using MarsalaWeb.DAL;
using MarsalaWeb.Auth;
using MarsalaWeb.Auth.Model;
using MarsalaWeb.Services;
using MarsalaWeb.Services.Mail;

namespace MarsalaWeb
{
	public class Startup
	{
		public Startup(IHostingEnvironment env)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				.AddEnvironmentVariables();
			Configuration = builder.Build();
		}

		public IConfigurationRoot Configuration { get; }


		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IAuthService authService)
		{
			loggerFactory.AddConsole(Configuration.GetSection("Logging"));
			
			//TODO
			//app.UseCors("AllowAllOrigins");

			if (env.IsDevelopment())
				app.UseDeveloperExceptionPage();

			app.UseDefaultFiles();
			app.UseStaticFiles();

			//SignalR authorization info passing
			app.Use((context, next) =>
			{
				if (context.Request.Path.HasValue && context.Request.Path.StartsWithSegments("/signalr") && string.IsNullOrWhiteSpace(context.Request.Headers["Authorization"]))
				{
					if (context.Request.QueryString.HasValue)
					{
						var authInfo = context.Request.QueryString.Value.Split('&').FirstOrDefault(x => x.Contains("authorization"));
						var token = authInfo?.Split('=')[1];

						if (!string.IsNullOrWhiteSpace(token))
						{
							context.Request.Headers.Add("Authorization", new[] { $"Bearer {token}" });
						}
					}
				}
				return next.Invoke();
			});

			app.UseJwtBearerAuthentication(authService.GetBearerOptions());

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action}/{id?}");
			});
			app.UseWebSockets();
			app.UseSignalR("/signalr");
		}

		public void ConfigureServices(IServiceCollection services)
		{
			//TODO
			//services.AddCors(options =>
			//{
			//	options.AddPolicy("AllowAllOrigins",
			//		builder =>
			//		{
			//			builder
			//				.AllowAnyOrigin()
			//				.AllowAnyHeader()
			//				.AllowAnyMethod();
			//		});
			//});


			// Setup options with DI
			services.AddOptions();

			// Configure MailSettings using a sub-section of the appsettings.json file
			services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
			services.AddSingleton<IMailWorker, MailWorker>();

			services.Configure<AuthOptions>(Configuration.GetSection("AuthOptions"));
			services.AddSingleton<IAuthService, AuthService>();

			// Add framework services.
			services.AddMvc(config =>
			{
				var policy = new AuthorizationPolicyBuilder()
							 .RequireAuthenticatedUser()
							 .Build();
				config.Filters.Add(new AuthorizeFilter(policy));
			});

			services.AddSignalR();

			services.AddLogging();

			services.AddSingleton<IFileParser, FileParser>();

			services.AddTransient<IMenuService, MenuService>();
			services.AddTransient<IMenuStore, MenuStore>();



			services.AddTransient<IOrderService, OrderService>();
			services.AddTransient<IOrdersStore, OrdersStore>();

			services.AddSingleton<IClientInterationService, ClientInterationService>();

			SetupIdentityServices(services);
		}

		private void SetupIdentityServices(IServiceCollection services)
		{
			var connectionString = Configuration.GetConnectionString("DefaultConnection");
			services.AddEntityFramework()
				.AddEntityFrameworkSqlite()
				.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connectionString));

			DbInitializer.Initialize(connectionString);

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

	}
}
