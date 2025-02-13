using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Groups.UpdateGroup
{
    public class UpdateGroupCommandHandler(
        ISynchroRepository<Group> groupRepository,
        IEntityValidatorService<Group> groupValidator,
        IMapper mapper
    ) : IRequestHandler<UpdateGroupCommand>
    {
        private readonly ISynchroRepository<Group> _groupRepository = groupRepository;
        private readonly IEntityValidatorService<Group> _groupValidator = groupValidator;
        private readonly IMapper _mapper = mapper;

        public async Task Handle(UpdateGroupCommand request, CancellationToken cancellationToken)
        {
            await _groupValidator.EntityExistsAsync(request.Id, cancellationToken);
            var group = await _groupRepository.GetByIdAsync(request.Id, cancellationToken);
            _mapper.Map(request, group);
            await _groupRepository.UpdateAsync(group, cancellationToken);
        }
    }
}
