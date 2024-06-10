
using Elastic.Clients.Elasticsearch;
using Elastic.Transport;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using Server.Services.Implementation;
using Server.Services.Interfaces;
using WeaponsClassLibrary.Data;
using AspNet.Security.OpenId;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Server
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddHttpClient();
            builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

            //AUTH
            builder.Services.AddAuthentication(options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                })

            .AddCookie(options =>
            {
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.SameSite = SameSiteMode.None;
                options.LoginPath = "/login";
                options.LogoutPath = "/signout";
            })
            .AddSteam();

            // Add services to the container.
            builder.Services.AddTransient<IUserQueryService, UserQueryService>();
            builder.Services.AddTransient<IWeaponService, WeaponService>();
            builder.Services.AddTransient<IInventoryService, InventoryService>();
            builder.Services.AddAutoMapper(typeof(Program).Assembly);
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            {
                var connStringBuilder = new NpgsqlConnectionStringBuilder()
                {
                    Host = builder.Configuration["DB_HOST"] ?? "crdb",
                    Port = 26257,
                    Username = builder.Configuration["DB_USER"] ?? "root",
                    Password = builder.Configuration["DB_PASSWORD"] ?? "",
                };
                connStringBuilder.Database = "db";
                options.UseNpgsql(connStringBuilder.ConnectionString);
            });
            
            builder.Services.AddControllers();
            builder.Services.AddHttpContextAccessor();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseHttpsRedirection();
            app.UseCors(build => build.WithOrigins(builder.Configuration["APP_HOST"]!)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials());
            
            app.MapControllers();
            app.Run();
        }
    }
}
