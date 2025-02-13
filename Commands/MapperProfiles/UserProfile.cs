using AutoMapper;
using Commands.Commands.Users.UpdateUser;
using Core.Domain.Entities;

namespace Commands.MapperProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UpdateUserCommand, User>();
        }
    }
}
