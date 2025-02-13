using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Exceptions;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Users.GetUser
{
    public class GetUserQueryHandler(
        IUserRepository userRepository,
        IMapper mapper) : IRequestHandler<GetUserQuery, UserDto>
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<UserDto> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var exists = await _userRepository.ExistsAsync(request.Id, cancellationToken);

            if (!exists)
            {
                throw new BusinessValidationException("User with such id does not exist..");
            }

            return await _userRepository
                .GetAll()
                .Where(x => x.Id == request.Id)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .SingleAsync(cancellationToken);
        }
    }
}
