using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.GenericRepository;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Queries.Queries.Bot.Qustions.GetStats
{
    public class GetQuizStatsQueryHandler(
        IUserRepository userRepository,
        IMapper mapper,
        IGenericRepository<Question> questionsRepository,
        IGenericRepository<Answer> answersRepository)
        : IRequestHandler<GetQuizStatsQuery, string>
    {
        public async Task<string> Handle(GetQuizStatsQuery request, CancellationToken cancellationToken)
        {
            var userId = await userRepository
                .GetAll()
                .Where(u => u.TelegramChatId == request.TelegramChatId)
                .Select(x => x.Id)
                .FirstOrDefaultAsync(cancellationToken);

            var answeredQuestionsCount = await answersRepository
                .GetAll()
                .Where(a => a.UserId == userId)
                .Select(a => a.QuestionId)
                .CountAsync(cancellationToken);

            var correctlyAnsweredQuestionsCount = await answersRepository
                .GetAll()
                .Where(a => a.UserId == userId && a.IsCorrect == true)
                .Select(a => a.QuestionId)
                .CountAsync(cancellationToken);

            var totalQuestionsCount = await questionsRepository
                .GetAll()
                .CountAsync(cancellationToken);

            var topicsToLearn = await answersRepository
                .GetAll()
                .Include(a => a.Question)
                .Where(a => a.UserId == userId && a.IsCorrect != true && a.Question.Topics != null)
                .Select(a => a.Question.Topics)
                .ToListAsync(cancellationToken);

            var correctlyAnsweredQuestionsPercentage = Math.Round(((double)correctlyAnsweredQuestionsCount / answeredQuestionsCount) * 100, 2);

            var statsMessage = $"""
                <b>📊 Ваша статистика по викторине:</b>
                • 🧠 Всего вопросов: <b>{totalQuestionsCount}</b>
                • ✅ Правильных ответов: <b>{correctlyAnsweredQuestionsCount}</b>
                • ❌ Неправильных ответов: <b>{answeredQuestionsCount - correctlyAnsweredQuestionsCount}</b>
                • 📈 Процент правильных: <b>{correctlyAnsweredQuestionsPercentage}%</b>

                <b>🧐 Темы, которые стоит повторить:</b>
                {(topicsToLearn.Count == 0
                    ? "🎉 Нет ошибок — так держать!"
                    : string.Join("\n", topicsToLearn
                        .SelectMany(t => t)
                        .Distinct()
                        .Select(t => $"• {t}")))}
                """;

            return statsMessage;
        }
    }
}
