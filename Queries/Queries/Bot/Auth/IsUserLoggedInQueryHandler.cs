using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace Queries.Queries.Bot.Auth
{
    public class IsUserLoggedInQueryHandler(
        IUserRepository userRepository) : IRequestHandler<IsUserLoggedInQuery, bool?>
    {
        private readonly IUserRepository _userRepository = userRepository;

        public async Task<bool?> Handle(IsUserLoggedInQuery request, CancellationToken cancellationToken)
        {
            var currentUser = await _userRepository
                .GetAll()
                .Where(x => x.TelegramChatId == request.TelegramChatId)
                .FirstOrDefaultAsync(cancellationToken);

            if (currentUser == null)
            {
                return null;
            }

            return currentUser.TelegramChatId != null;
        }
    }
}
