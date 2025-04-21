using Common.Enums;
using Core.Domain.Entities;
using Core.Repositories.GenericRepository;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text;
using static Common.Enums.PriorityTypeEnum;
using static Common.Enums.WorkItemStatusTypeEnum;
using static Common.Enums.WorkItemTypeEnum;

namespace Queries.Queries.Bot.Tasks.GetTasks
{
    public class GetTasksForBotQueryHandler(
        IUserRepository userRepository,
        IGenericRepository<WorkItem> workItemRepository)
            : IRequestHandler<GetTasksForBotQuery, string>
    {
        public async Task<string> Handle(GetTasksForBotQuery request, CancellationToken cancellationToken)
        {
            var user = await userRepository
                .GetAll()
                .Where(u => u.TelegramChatId == request.TelegramChatId)
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                return "❌ Пользователь не найден.";
            }

            var workItems = await workItemRepository
                .GetAll()
                .Where(w => w.UserId == user.Id && !w.IsDeleted)
                .OrderByDescending(w => w.CreatedAt)
                .ToListAsync(cancellationToken);

            if (!workItems.Any())
            {
                return "📭 У вас пока нет задач.";
            }

            var resultBuilder = new StringBuilder();

            for (int i = 0; i < workItems.Count; i++)
            {
                var item = workItems[i];

                resultBuilder.AppendLine("🗂️ <b>Название:</b> <i>" + EscapeHtml(item.Title) + "</i>\n");
                resultBuilder.AppendLine("📝 <b>Описание:</b> " + EscapeHtml(item.Description) + "\n");

                resultBuilder.AppendLine($"⚡ <b>Приоритет:</b> {GetPriorityEmoji(item.Priority)} <code>{item.Priority}</code>\n");
                resultBuilder.AppendLine($"🧩 <b>Тип:</b> {GetTypeEmoji(item.Type)} <code>{item.Type}</code>\n");
                resultBuilder.AppendLine($"📊 <b>Статус:</b> {GetStatusEmoji(item.Status)} <code>{item.Status}</code>\n");
                resultBuilder.AppendLine($"🔄 <b>Состояние:</b> {GetStateEmoji(item.State)} <code>{item.State}</code>\n");

                resultBuilder.AppendLine($"🕒 <b>Создан:</b> {item.CreatedAt:dd/MM/yyyy HH:mm}\n");

                if (i < workItems.Count - 1)
                {
                    resultBuilder.AppendLine("──────────────\n");
                }
            }


            return resultBuilder.ToString();
        }

        private static string EscapeHtml(string? text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return "-";

            return System.Net.WebUtility.HtmlEncode(text);
        }

        private static string GetPriorityEmoji(PriorityType priority) => priority switch
        {
            PriorityType.Trivial => "🟢",
            PriorityType.Low => "🟦",
            PriorityType.Medium => "🟡",
            PriorityType.High => "🟠",
            PriorityType.Critical => "🔴",
            _ => ""
        };

        private static string GetTypeEmoji(WorkItemType type) => type switch
        {
            WorkItemType.Bug => "🐞",
            WorkItemType.Story => "📖",
            WorkItemType.Hotfix => "♨️",
            WorkItemType.Feature => "✨",
            _ => ""
        };

        private static string GetStatusEmoji(WorkItemStatusType status) => status switch
        {
            WorkItemStatusType.New => "🆕",
            WorkItemStatusType.Active => "🚧",
            WorkItemStatusType.Resolved => "✅",
            WorkItemStatusType.Closed => "📦",
            _ => ""
        };

        private static string GetStateEmoji(WorkItemStateType state) => state switch
        {
            WorkItemStateType.ForBa => "🧠",
            WorkItemStateType.ForDevelopment => "🧑‍💻",
            WorkItemStateType.InDevelopment => "💻",
            WorkItemStateType.ForTesting => "🔍",
            WorkItemStateType.InTesting => "🧪",
            WorkItemStateType.ForMerge => "🔀",
            WorkItemStateType.Merged => "🧷",
            _ => ""
        };

    }
}
