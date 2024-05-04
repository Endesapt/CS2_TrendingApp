using WeaponsClassLibrary.Data;
using DbUpdateWorker.Models.ResponseModels;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Net.Http.Json;
using System.Text.Json;
using WeaponsClassLibrary;
using RabbitMQ.Client;
using DbUpdateWorker.Models.RabbitMQ;
using System.Text;

namespace DbUpdateWorker
{
    public class DbUpdater : BackgroundService
    {
        private readonly ILogger<DbUpdater> _logger;
        private readonly IServiceProvider _provider;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        public DbUpdater(IHttpClientFactory factory,
            IServiceProvider provider,ILogger<DbUpdater> logger,
            IConfiguration configuration)
        {
            _configuration = configuration;
            _logger = logger;
            _httpClientFactory = factory;
            _provider = provider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {

                    using HttpClient client = _httpClientFactory.CreateClient();
                    var weaponsResponce = await client.GetFromJsonAsync<WeaponsInfo>(
                                           $"https://csgobackpack.net/api/GetItemsList/v2/",
                                           new JsonSerializerOptions(JsonSerializerDefaults.Web));
                    if (weaponsResponce == null) {
                        throw new Exception("Cannot get data from csgobackpack");
                    }
                    var allWeapons = weaponsResponce.ItemsList.Where(k =>
                    (k.Value.ClassId is not null)
                    ).DistinctBy(k => k.Value.ClassId).ToDictionary();
                    foreach (var weapon in allWeapons)
                    {
                        Price? price = null;
                        if (weapon.Value.Prices == null) { }
                        else if (weapon.Value.Prices.TryGetValue("24_hours", out price)) { }
                        else if (weapon.Value.Prices.TryGetValue("7_days", out price)) { }
                        else if (weapon.Value.Prices.TryGetValue("30_days", out price)) { }
                        else if (weapon.Value.Prices.TryGetValue("all_time", out price)) { }
                        weapon.Value.Price = price?.Average ?? 0;
                    }
                    using var scope = _provider.CreateScope();
                    using var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                    DateTime dateTimeNow= DateTime.UtcNow;
                    await db.Weapons.ForEachAsync(w =>
                    {
                        if (allWeapons.ContainsKey(w.Name))
                        {
                            WeaponPrice weaponPrice = new()
                            {
                                WeaponClassId = w.ClassId,
                                Price= allWeapons[w.Name].Price,
                                PriceTime=dateTimeNow
                            };
                            w.CurrentPrice = weaponPrice.Price;
                            db.Update(w);
                            db.Add(weaponPrice);
                            allWeapons.Remove(w.Name);
                        }
                    }
                    );
                    foreach( var weapon in allWeapons)
                    {
                        Weapon newWeapon = new()
                        {
                            ClassId = weapon.Value.ClassId ?? 0L,
                            IconUrl = weapon.Value.IconUrl,
                            CurrentPrice = weapon.Value.Price,
                            Name = weapon.Value.Name,
                            Type = weapon.Value.Type,
                        };
                        WeaponPrice weaponPrice = new()
                        {
                            WeaponClassId = newWeapon.ClassId,
                            Price = newWeapon.CurrentPrice,
                            PriceTime = dateTimeNow
                        };
                        db.Add(newWeapon);
                        db.Add(weaponPrice);
                        
                    }
                    db.SaveChanges();
                    db.ChangeTracker.Clear();
                    CheckForEvents();

                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error while refreshing weapons db: " + ex.ToString());
                }
                //8 hours
                await Task.Delay(1000 * 3600 * 8, stoppingToken);
            }
        }
        private void CheckForEvents()
        {
            using var scope = _provider.CreateScope();
            using var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var validQueries = db.UserQueries.Include((uq) => uq.Weapon).Where((uq) =>
                uq.Weapon.CurrentPrice<=uq.MinPrice ||
                uq.Weapon.CurrentPrice>=uq.MaxPrice
            );
            var factory = new ConnectionFactory {
                HostName = _configuration["RABBITMQ_HOST"],
                Password = _configuration["RABBITMQ_PASS"],
                UserName= _configuration["RABBITMQ_USER"]
            };
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();
            channel.QueueDeclare(queue: "event_messages",
                     durable: true,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null);

            var serializeOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };
            foreach (var query in validQueries)
            {
                bool isBigger = query.MaxPrice >= query.Weapon.CurrentPrice;
                var queryDto = new RabbitQueryDto()
                {
                    CurrentPrice = query.Weapon.CurrentPrice,
                    UserId = query.UserId.ToString(),
                    Event = isBigger ?
                        RabbitQueryEventType.more : RabbitQueryEventType.less,
                    EventPrice = isBigger ? query.MaxPrice : query.MinPrice,
                    WeaponName=query.Weapon.Name
                };
                var body = JsonSerializer.Serialize(queryDto,serializeOptions);
                channel.BasicPublish(exchange: string.Empty,
                     routingKey: "event_messages",
                     mandatory:false,
                     basicProperties: null,
                     body: Encoding.UTF8.GetBytes(body));
            }
            db.RemoveRange(validQueries);
            db.SaveChanges();
        }
    }
}
