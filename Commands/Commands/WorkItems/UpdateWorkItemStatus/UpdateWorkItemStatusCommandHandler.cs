using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.WorkItems.UpdateWorkItemStatus
{
    public class UpdateWorkItemStatusCommandHandler(
        ISynchroRepository<WorkItem> workItemRepository,
        IEntityValidatorService<WorkItem> workItemValidator
    ) : IRequestHandler<UpdateWorkItemStatusCommand>
    {
        private readonly ISynchroRepository<WorkItem> workItemRepository = workItemRepository;
        private readonly IEntityValidatorService<WorkItem> workItemValidator = workItemValidator;

        public async Task Handle(UpdateWorkItemStatusCommand request, CancellationToken cancellationToken)
        {
            await workItemValidator.EntityExistsAsync(request.Id, cancellationToken);

            await workItemRepository.UpdateAsync(x => x.Id == request.Id, x => new WorkItem { Status = request.Status }, cancellationToken);
        }
    }
}
