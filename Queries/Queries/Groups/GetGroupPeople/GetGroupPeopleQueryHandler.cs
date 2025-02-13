using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Groups.GetGroupPeople
{
    public class GetGroupPeopleQueryHandler(
    IUserRepository userRepository,
    IMapper mapper) : IRequestHandler<GetGroupPeopleQuery, IEnumerable<GroupUserDto>>
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<GroupUserDto>> Handle(GetGroupPeopleQuery request, CancellationToken cancellationToken)
        {
            return await userRepository
                .GetAll()
                .Where(x => x.GroupId == request.Id)
                .ProjectTo<GroupUserDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
