using Common.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebApplication1.Services;

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


			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

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
		}
	}
}
