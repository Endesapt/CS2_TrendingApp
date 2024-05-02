using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeaponsClassLibrary
{
    [PrimaryKey(nameof(Id))]
    public class UserQuery
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public required  long UserId {  get; set; }
        [ForeignKey(nameof(WeaponClassId))]
        public Weapon Weapon { get; set; } = null!;
        public required long WeaponClassId {  get; set; }
        public required int CurrentPrice { get; set; }
        public required int MaxPrice { get; set; } = int.MaxValue;
        public required int MinValue { get; set; }=int.MinValue;
    }
}
