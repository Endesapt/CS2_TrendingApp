using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WeaponsClassLibrary
{
    [PrimaryKey(nameof(WeaponClassId), nameof(PriceTime))]
    public class WeaponPrice
    {
        [ForeignKey(nameof(WeaponClassId))]
        public Weapon Weapon { get; set; } = null!;
        public required long WeaponClassId {  get; set; } 
        public required double Price { get; set; }
        public required DateTime PriceTime { get; set; }
    }
}
