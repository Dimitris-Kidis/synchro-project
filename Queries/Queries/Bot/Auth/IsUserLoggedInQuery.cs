using MediatR;

namespace Queries.Queries.Bot.Auth
{
    public class IsUserLoggedInQuery : IRequest<bool?>
    {
        public long TelegramChatId { get; set; }
    }
}
