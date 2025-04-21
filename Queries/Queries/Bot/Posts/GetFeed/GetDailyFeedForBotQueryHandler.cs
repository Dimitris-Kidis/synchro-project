using Core.Domain.Entities;
using Core.Repositories.GenericRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.RegularExpressions;

namespace Queries.Queries.Bot.Posts.GetFeed
{
    public class GetDailyFeedForBotQueryHandler(
        IGenericRepository<WebContent> webContentRepository)
            : IRequestHandler<GetDailyFeedForBotQuery, string>
    {
        public async Task<string> Handle(GetDailyFeedForBotQuery request, CancellationToken cancellationToken)
        {
            var today = DateTimeOffset.UtcNow.Date;

            var posts = await webContentRepository
                .GetAll()
                .Where(p => !string.IsNullOrWhiteSpace(p.Title)
                         && p.CreatedAt.Date == today)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync(cancellationToken);

            if (!posts.Any())
            {
                return "📭 Сегодня постов нет.";
            }

            var sb = new StringBuilder();

            for (int i = 0; i < posts.Count; i++)
            {
                var post = posts[i];

                sb.AppendLine($"📰 <b>{EscapeHtml(post.Title)}</b>");
                sb.AppendLine($"✍️ <i>{EscapeHtml(post.Author)}</i>");
                sb.AppendLine($"📅 {post.CreatedAt:dd.MM.yyyy HH:mm}");

                if (!string.IsNullOrWhiteSpace(post.Description))
                {
                    sb.AppendLine($"\n📌 {EscapeHtml(post.Description)}");
                }

                if (!string.IsNullOrWhiteSpace(post.Content))
                {
                    sb.AppendLine($"\n📝 {Truncate(FormatContentForTelegram(post.Content), 300)}");
                }

                if (i < posts.Count - 1)
                {
                    sb.AppendLine("\n──────────────\n");
                }
            }

            return sb.ToString();
        }

        private static string EscapeHtml(string? text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return "-";

            return System.Net.WebUtility.HtmlEncode(text);
        }

        private static string Truncate(string text, int maxLength)
        {
            if (text.Length <= maxLength)
                return text;

            return text[..maxLength] + "...";
        }

        private static string FormatContentForTelegram(string? html)
        {
            if (string.IsNullOrWhiteSpace(html))
                return "";

            // 1. Заменим теги на поддерживаемые
            string text = html
                .Replace("<strong>", "<b>").Replace("</strong>", "</b>")
                .Replace("<em>", "<i>").Replace("</em>", "</i>")
                .Replace("&nbsp;", " ")
                .Replace("<br>", "\n")
                .Replace("<br/>", "\n")
                .Replace("<br />", "\n")
                .Replace("<p>", "").Replace("</p>", "\n");

            // 2. Удалим все НЕПОДДЕРЖИВАЕМЫЕ теги
            text = Regex.Replace(text, @"<(?!/?(b|i|u|a)(\s|>|$)).*?>", string.Empty, RegexOptions.IgnoreCase);

            // 3. Заменим амперсанды и другие символы на безопасные
            text = System.Net.WebUtility.HtmlEncode(text);

            // 4. Вернём поддерживаемые теги в виде HTML (не закодированные)
            text = text
                .Replace("&lt;b&gt;", "<b>").Replace("&lt;/b&gt;", "</b>")
                .Replace("&lt;i&gt;", "<i>").Replace("&lt;/i&gt;", "</i>")
                .Replace("&lt;u&gt;", "<u>").Replace("&lt;/u&gt;", "</u>");

            // Если есть <a href="..."> — тоже можно вернуть вручную, если ты это используешь

            return text.Trim();
        }


    }
}
