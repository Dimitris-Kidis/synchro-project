using AutoMapper;
using Core.Domain.Entities;
using Queries.Queries.DTOs;

namespace Queries.MapperProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>();
        }
    }
}