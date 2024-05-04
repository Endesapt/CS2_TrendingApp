using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DbUpdateWorker.Models.RabbitMQ
{
    public enum RabbitQueryEventType { 
        more,
        less
    }

    public class RabbitQueryDto
    {
        public required string UserId { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public required RabbitQueryEventType Event { get; set; }
        public required double EventPrice { get; set; }
        public required double CurrentPrice { get; set; }

        public required string WeaponName { get; set; }
    }
}
