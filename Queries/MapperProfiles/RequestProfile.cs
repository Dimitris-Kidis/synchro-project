using AutoMapper;
using Core.Domain.Entities;
using Queries.DTOs;

namespace Queries.MapperProfiles
{
    public class RequestProfile : Profile
    {
        public RequestProfile()
        {
            CreateMap<Request, RequestDto>();
        }
    }
}
