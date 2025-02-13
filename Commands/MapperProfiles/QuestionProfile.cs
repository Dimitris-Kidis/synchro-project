using AutoMapper;
using Commands.Commands.Questions.CreateQuestion;
using Commands.Commands.Questions.UpdateQuestion;
using Core.Domain.Entities;

namespace Commands.MapperProfiles
{
    public class QuestionProfile : Profile
    {
        public QuestionProfile()
        {
            CreateMap<CreateQuestionCommand, Question>();
            CreateMap<UpdateQuestionCommand, Question>()
                .ForMember(x => x.Id, opt => opt.Ignore());
        }
    }
}
