using AutoMapper;
using Core.Domain.Entities;
using Queries.Queries.DTOs;

namespace Queries.MapperProfiles
{
    public class GroupProfile : Profile
    {
        public GroupProfile()
        {
            CreateMap<Group, GroupInfoDto>();
        }
    }
}
