using Microsoft.EntityFrameworkCore;
using Server.Services.Interfaces;
using WeaponsClassLibrary;
using WeaponsClassLibrary.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Server.Services.Implementation
{
    public class UserQueryService : IUserQueryService
    {
        private readonly ApplicationDbContext _context;
        public UserQueryService(ApplicationDbContext context) { 
            _context = context;
        }
        public async Task<UserQuery?> AddQuery(UserQuery query)
        {
            var weapon = _context.Weapons.FirstOrDefault((uq) => uq.ClassId == query.WeaponClassId);
            if(weapon == null)
            {
                return null;
            }
            _context.Add(query);
            await _context.SaveChangesAsync();
            return query;
             
        }

        public async Task<bool> DeleteQuery(Guid queryId, long userId)
        {
            var userQuery = _context.UserQueries.FirstOrDefault((uq)=>uq.Id==queryId);
            if (userQuery is null || userQuery.UserId != userId) { 
                return false;
            }
            
            _context.Remove(userQuery);
            await _context.SaveChangesAsync();
            return true;
            
        }

        public IEnumerable<UserQuery> GetQueries(long userId)
        {
            return _context.UserQueries.Where(q => q.UserId == userId).Include(uq=>uq.Weapon);
        }

        public async Task<(UserQuery?,bool)> UpdateQuery(UserQuery query)
        {
            var userQuery = _context.UserQueries.FirstOrDefault((uq) => uq.Id == query.Id);
            if (userQuery is null || userQuery.UserId != query.UserId || userQuery.WeaponClassId != query.WeaponClassId)
            {
                return (null,false);
            }
            
            _context.Update(query);
            await _context.SaveChangesAsync();
            return (query,true);
        }
    }
}
