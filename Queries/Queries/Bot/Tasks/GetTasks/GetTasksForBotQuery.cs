using MediatR;

namespace Queries.Queries.Bot.Tasks.GetTasks
{
    public class GetTasksForBotQuery : IRequest<string>
    {
        public long TelegramChatId { get; set; }
    }
}
