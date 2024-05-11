
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Server.Services.Implementation;
using Server.Services.Interfaces;
using WeaponsClassLibrary.Data;

namespace Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddTransient<IUserQueryService, UserQueryService>();
            builder.Services.AddTransient<IWeaponService, WeaponService>();
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

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors(builder => builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod());

            app.MapControllers();

            app.Run();
        }
    }
}
