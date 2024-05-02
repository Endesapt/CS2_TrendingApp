using AutoMapper;
using Server.Dto;
using WeaponsClassLibrary;

namespace Server
{
    public class AutoMapper:Profile
    {
        public AutoMapper()
        {
            CreateMap<UserQueryDto, UserQuery>();
        }
    }
}
