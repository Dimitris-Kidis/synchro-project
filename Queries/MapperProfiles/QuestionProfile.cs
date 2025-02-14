using AutoMapper;
using Core.Domain.Entities;
using Queries.DTOs;

namespace Queries.MapperProfiles
{
    public class QuestionProfile : Profile
    {
        public QuestionProfile()
        {
            CreateMap<Question, QuestionDto>();
            CreateMap<Question, QuestionViewDto>();
        }
    }
}
