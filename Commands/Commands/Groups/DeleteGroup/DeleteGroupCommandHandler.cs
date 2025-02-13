using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Groups.DeleteGroup
{
    public class DeleteGroupCommandHandler(
        ISynchroRepository<Group> groupRepository,
        IEntityValidatorService<Group> groupValidator
    ) : IRequestHandler<DeleteGroupCommand>
    {
        private readonly ISynchroRepository<Group> _groupRepository = groupRepository;
        private readonly IEntityValidatorService<Group> _groupValidator = groupValidator;

        public async Task Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
        {
            await _groupValidator.EntityExistsAsync(request.Id, cancellationToken);
            Group group = await _groupRepository.GetByIdAsync(request.Id, cancellationToken);
            await _groupRepository.DeleteAsync(group, cancellationToken);
        }
    }
}
