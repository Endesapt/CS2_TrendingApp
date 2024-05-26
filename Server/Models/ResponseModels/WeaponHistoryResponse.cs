using Microsoft.EntityFrameworkCore.Query.Internal;
using WeaponsClassLibrary;

namespace Server.Models.ResponseModels
{
    public struct HistoryPriceInfo
    {
        public required double Price { get; set; }
        public required DateTime PriceTime { get; set; }
    }
    public class WeaponHistoryResponse
    {
        public required string WeaponClassId { get; set; }
        public required IEnumerable<HistoryPriceInfo> Prices { get; set; } = null!;
    }
}
