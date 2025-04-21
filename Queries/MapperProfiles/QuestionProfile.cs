using AutoMapper;
using Core.Domain.Entities;
using Queries.DTOs;
using Queries.Queries.Bot.Qustions.GetNextQuestion;

namespace Queries.MapperProfiles
{
    public class QuestionProfile : Profile
    {
        public QuestionProfile()
        {
            CreateMap<Question, QuestionDto>();
            CreateMap<Question, QuestionViewDto>();
            CreateMap<Question, QuizQuestionDto>();
        }
    }
}
