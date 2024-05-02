using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeaponsClassLibrary;

namespace WeaponsClassLibrary.Data
{
    public class ApplicationDbContext:DbContext
    {
        public DbSet<Weapon> Weapons { get; set; }
        public DbSet<WeaponPrice> WeaponsPrices { get; set; }
        public DbSet<UserQuery> UserQueries { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
