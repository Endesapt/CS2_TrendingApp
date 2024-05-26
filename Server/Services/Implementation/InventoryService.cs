using Elastic.Clients.Elasticsearch.Nodes;
using Server.Models.ResponseModels;
using Server.Services.Interfaces;
using System.Net.Http.Headers;
using System.Text.Json;
using WeaponsClassLibrary;
using WeaponsClassLibrary.Data;

namespace Server.Services.Implementation
{
    public class InventoryService : IInventoryService
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;
        public InventoryService(ApplicationDbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
        }
        public async Task<IEnumerable<Weapon>> GetInventory(long userId)
        {
            var weapons =await ParseWeaponsFromSteam(userId);
            if( weapons == null )
            {
                return null;
            }
            return _context.Weapons.Where(w=>weapons.Contains(w.ClassId)).ToList();
        }
        public async  Task<List<long>> ParseWeaponsFromSteam(long userId)
        {
            return new List<long> { 4141780686, 3608084106, 4839650824 };
        }
    }
}
