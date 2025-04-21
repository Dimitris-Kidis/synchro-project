using Core.Domain.Entities;
using Core.Repositories.GenericRepository;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.Commands.Bot.Questions.RemoveQuizStats
{
    public class RemoveQuizStatsCommandHandler(
        IUserRepository userRepository,
        IGenericRepository<Answer> answersRepository)
    : IRequestHandler<RemoveQuizStatsCommand>
    {
        public async Task Handle(RemoveQuizStatsCommand request, CancellationToken cancellationToken)
        {
            var user = await userRepository
                .GetAll()
                .Where(u => u.TelegramChatId == request.TelegramChatId)
                .FirstOrDefaultAsync(cancellationToken);

            var answers = await answersRepository
                .GetAll()
                .Where(u => u.UserId == user.Id)
                .ToListAsync(cancellationToken);

            foreach (var answer in answers)
            {
                answersRepository.DeleteAsync(answer);
            }
        }
    }
}
