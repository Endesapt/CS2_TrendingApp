using Elastic.Clients.Elasticsearch.Nodes;
using Newtonsoft.Json;
using Server.Models.ResponseModels;
using Server.Services.Interfaces;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Web;
using WeaponsClassLibrary;
using WeaponsClassLibrary.Data;

namespace Server.Services.Implementation
{
    public class InventoryService : IInventoryService
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        public InventoryService(ApplicationDbContext context, IHttpClientFactory httpClientFactory,
            IConfiguration configuration)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
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
        //it currently didn't work and returns mock info because of Steam API troubles
        public async  Task<List<long>> ParseWeaponsFromSteam(long userId)
        {
            var httpClient = _httpClientFactory!.CreateClient();
            var urlBuilder = new UriBuilder($"https://steamcommunity.com/inventory/{userId}/440/2");
            var query = HttpUtility.ParseQueryString(urlBuilder.Query);
            query["contextid"] = "2";
            query["key"] = _configuration["STEAM_API_KEY"];
            query["steamid"] = userId.ToString();
            query["get_descriptions"] = "true";
            query["appid"] = "730";
            urlBuilder.Query = query.ToString();
            string url = urlBuilder.ToString();
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, url);

            var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);
            if (httpResponseMessage.IsSuccessStatusCode)
            {
                var contentString =
                    await httpResponseMessage.Content.ReadAsStringAsync();

                var response = JsonConvert.DeserializeObject<dynamic>(contentString);
                if (response?.response?.assets == null) return null;

                var assets = response.response.assets;
                IEnumerable<dynamic> descriptions = response.response.descriptions;
                return descriptions.Select(d =>
                {
                    return (long)d.classid;
                }).ToList();
            }
            return new List<long> { 4141780686, 3608084106, 4839650824 };

        }
    }
}
