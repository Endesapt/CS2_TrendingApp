using Server.Dto;
using WeaponsClassLibrary;

namespace Server.Services.Interfaces
{
    public interface IUserQueryService
    {
        public IEnumerable<UserQuery> GetQueries(long userId);
        public Task<UserQuery?> AddQuery(UserQuery query);
        public Task<bool> DeleteQuery(Guid queryId, long userId);
        public Task<(UserQuery?,bool)> UpdateQuery(UserQuery query);
    }
}
