using DbUpdateWorker;
using DbUpdateWorker.Data;
using Microsoft.EntityFrameworkCore;
using Npgsql;


var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<DbUpdater>();
builder.Services.AddHttpClient();
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
var host = builder.Build();

//migrate DB if not created
using (var scope = host.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetService<ApplicationDbContext>();
    dbContext!.Database.Migrate();
}

host.Run();
