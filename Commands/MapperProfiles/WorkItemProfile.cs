using AutoMapper;
using Commands.Commands.WorkItems.CreateWorkItem;
using Commands.Commands.WorkItems.UpdateWorkItem;
using Core.Domain.Entities;
using Queries.DTOs;

namespace Commands.MapperProfiles
{
    public class WorkItemProfile : Profile
    {
        public WorkItemProfile()
        {
            CreateMap<CreateWorkItemCommand, WorkItem>();
            CreateMap<UpdateWorkItemCommand, WorkItem>()
                .ForMember(x => x.Id, opt => opt.Ignore());

            CreateMap<WorkItem, WorkItemDto>()
                .ForMember(x => x.AssigneeAvatar, opt => opt.MapFrom(x => x.User.Image));
        }
    }
}
