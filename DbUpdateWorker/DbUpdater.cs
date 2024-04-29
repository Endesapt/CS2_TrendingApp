using DbUpdateWorker.Data;
using DbUpdateWorker.Models.ResponseModels;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Net.Http.Json;
using System.Text.Json;
using WeaponsClassLibrary;

namespace DbUpdateWorker
{
    public class DbUpdater : BackgroundService
    {
        private readonly ILogger<DbUpdater> _logger;
        private readonly IServiceProvider _provider;
        private readonly IHttpClientFactory _httpClientFactory;
        public DbUpdater(IHttpClientFactory factory,
            IServiceProvider provider,ILogger<DbUpdater> logger)
        {
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
                            Name = weapon.Value.Name,
                            Type = weapon.Value.Type,
                        };
                        WeaponPrice weaponPrice = new()
                        {
                            WeaponClassId = newWeapon.ClassId,
                            Price = weapon.Value.Price,
                            PriceTime = dateTimeNow
                        };
                        db.Add(newWeapon);
                        db.Add(weaponPrice);
                    }
                    db.SaveChanges();
                    db.ChangeTracker.Clear();

                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error while refreshing weapons db: " + ex.ToString());
                }
                //8 hours
                await Task.Delay(1000 * 3600 * 8, stoppingToken);
            }
        }
    }
}
