using AutoMapper;
using Commands.Commands.Groups.CreateGroup;
using Commands.Commands.Groups.UpdateGroup;
using Core.Domain.Entities;

namespace Commands.MapperProfiles
{
    public class GroupProfile : Profile
    {
        public GroupProfile()
        {
            CreateMap<CreateGroupCommand, Group>()
                .ForMember(x => x.CanJoin, opt => opt.MapFrom(x => true))
                .ForMember(x => x.HasManager, opt => opt.MapFrom(x => false))
                .ForMember(x => x.IsApprovedToBeCreated, opt => opt.MapFrom(x => false))
                .ForMember(x => x.IsDeleted, opt => opt.MapFrom(x => false))
                .ForMember(x => x.ParticipantsNumber, opt => opt.MapFrom(x => 0))
                .ForMember(x => x.ParticipantsLimitNumber, opt => opt.MapFrom(x => 30));

            CreateMap<UpdateGroupCommand, Group>();
        }
    }
}