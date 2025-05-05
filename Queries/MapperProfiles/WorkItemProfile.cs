using AutoMapper;
using Core.Domain.Entities;
using Queries.DTOs;

namespace Queries.MapperProfiles
{
    public class WorkItemProfile : Profile
    {
        public WorkItemProfile()
        {
            CreateMap<WorkItem, WorkItemDto>()
                .ForMember(x => x.AssigneeAvatar, opt => opt.MapFrom(x => x.User.Image));
        }
    }
}
