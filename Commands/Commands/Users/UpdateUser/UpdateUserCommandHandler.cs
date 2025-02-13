using AutoMapper;
using Common.Exceptions;
using Core.Domain.Entities;
using Core.Repositories.UserRepository;
using MediatR;

namespace Commands.Commands.Users.UpdateUser
{
    public class UpdateUserCommandHandler(
        IUserRepository userRepository,
        IMapper mapper
        ) : IRequestHandler<UpdateUserCommand>
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IMapper _mapper = mapper;

        public async Task Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            User? existingUser = await _userRepository.GetByIdAsync(request.Id, cancellationToken);

            if (existingUser == null)
            {
                throw new BusinessValidationException($"User with ID {request.Id} not found.");
            }

            _mapper.Map(request, existingUser);

            await _userRepository.UpdateAsync(existingUser, cancellationToken);
        }
    }
}
