using MediatR;

namespace Commands.Commands.Bot.Questions.RemoveQuizStats
{
    public class RemoveQuizStatsCommand : IRequest
    {
        public long TelegramChatId { get; set; }
    }
}
