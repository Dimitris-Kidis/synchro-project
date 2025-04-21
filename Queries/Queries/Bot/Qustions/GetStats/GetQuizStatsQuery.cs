using MediatR;

namespace Queries.Queries.Bot.Qustions.GetStats
{
    public class GetQuizStatsQuery : IRequest<string>
    {
        public long TelegramChatId { get; set; }
    }
}
