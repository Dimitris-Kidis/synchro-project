using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Questions.GetAllQuestions
{
    public class GetAllQuestionsQuery : IRequest<IEnumerable<QuestionDto>>
    {
    }
}
