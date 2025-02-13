using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;

namespace Commands.Commands.Groups.CreateGroup
{
    public class CreateGroupCommandHandler(
        ISynchroRepository<Group> groupRepository,
        IMapper mapper
    ) : IRequestHandler<CreateGroupCommand, Guid>
    {
        private readonly ISynchroRepository<Group> _groupRepository = groupRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> Handle(CreateGroupCommand request, CancellationToken cancellationToken)
        {
            var group = _mapper.Map<Group>(request);
            await _groupRepository.AddAsync(group, cancellationToken);

            return group.Id;
        }
    }
}
