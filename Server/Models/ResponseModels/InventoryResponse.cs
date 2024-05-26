using System.Text.Json;
using System.Text.Json.Serialization;

namespace Server.Models.ResponseModels
{
    public struct Asset
    {
        [JsonPropertyName("classid")]
        public string ClassId { get; set; }
    }
    public class InventoryResponse
    {
        [JsonPropertyName("classid")]
        public List<Asset> Assets { get; set; }
    }
}
