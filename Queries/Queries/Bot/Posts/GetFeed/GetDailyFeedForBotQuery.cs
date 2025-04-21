using MediatR;

namespace Queries.Queries.Bot.Posts.GetFeed
{
    public class GetDailyFeedForBotQuery : IRequest<string>
    {
        public long TelegramChatId { get; set; }
    }
}
