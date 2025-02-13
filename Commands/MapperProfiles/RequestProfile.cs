using AutoMapper;
using Commands.Commands.Requests.CreateRequest;
using Commands.Commands.Requests.UpdateRequest;
using Core.Domain.Entities;
using static Common.Enums.RequestStatusTypeEnum;

namespace Commands.MapperProfiles
{
    public class RequestProfile : Profile
    {
        public RequestProfile()
        {
            CreateMap<CreateRequestCommand, Request>()
                .ForMember(x => x.Status, opt => opt.MapFrom(x => RequestStatusType.Pending));

            CreateMap<UpdateRequestCommand, Request>()
                .ForMember(x => x.Status, opt => opt.MapFrom(x => RequestStatusType.Pending));
        }
    }
}
