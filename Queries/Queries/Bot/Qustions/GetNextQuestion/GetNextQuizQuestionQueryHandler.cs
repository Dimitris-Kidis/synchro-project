using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.GenericRepository;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Queries.Queries.Bot.Qustions.GetNextQuestion
{
    public class GetNextQuizQuestionQueryHandle(
    IUserRepository userRepository,
    IMapper mapper,
    IGenericRepository<Question> questionsRepository)
        : IRequestHandler<GetNextQuizQuestionQuery, QuizQuestionDto>
    {
        public async Task<QuizQuestionDto> Handle(GetNextQuizQuestionQuery request, CancellationToken cancellationToken)
        {
            var userId = await userRepository
                .GetAll()
                .Where(u => u.TelegramChatId == request.TelegramChatId)
                .Select(x => x.Id)
                .FirstOrDefaultAsync(cancellationToken);

            return await questionsRepository
                .GetAll()
                .Where(q => !q.Answers.Any(a => a.UserId == userId))
                .OrderByDescending(q => q.CreatedAt)
                .ProjectTo<QuizQuestionDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}
