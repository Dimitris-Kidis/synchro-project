using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.WorkItems.DeleteWorkItem
{
    public class DeleteWorkItemCommandHandler(
        ISynchroRepository<WorkItem> workItemRepository,
        IEntityValidatorService<WorkItem> workItemValidator
        ) : IRequestHandler<DeleteWorkItemCommand>
    {
        private readonly ISynchroRepository<WorkItem> workItemRepository = workItemRepository;
        private readonly IEntityValidatorService<WorkItem> workItemValidator = workItemValidator;

        public async Task Handle(DeleteWorkItemCommand request, CancellationToken cancellationToken)
        {
            await workItemValidator.EntityExistsAsync(request.Id, cancellationToken);

            WorkItem wikiPage = await workItemRepository.GetByIdAsync(request.Id, cancellationToken);

            await workItemRepository.DeleteAsync(wikiPage, cancellationToken);
        }
    }
}
