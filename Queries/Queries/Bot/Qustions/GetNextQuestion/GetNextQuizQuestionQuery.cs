using MediatR;

namespace Queries.Queries.Bot.Qustions.GetNextQuestion
{
    public class GetNextQuizQuestionQuery : IRequest<QuizQuestionDto>
    {
        public long TelegramChatId { get; set; }
    }
}
