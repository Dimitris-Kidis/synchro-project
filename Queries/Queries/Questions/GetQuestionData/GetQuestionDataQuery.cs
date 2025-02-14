using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Questions.GetQuestionData
{
    public class GetQuestionDataQuery : IRequest<QuestionsWebDataDto>
    {
    }
}
