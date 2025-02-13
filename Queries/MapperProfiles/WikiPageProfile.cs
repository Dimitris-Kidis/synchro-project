using AutoMapper;
using Core.Domain.Entities;
using Queries.DTOs;

namespace Queries.MapperProfiles
{
    public class WikiPageProfile : Profile
    {
        public WikiPageProfile()
        {
            CreateMap<WikiPage, WikiPageDto>();
        }
    }
}
