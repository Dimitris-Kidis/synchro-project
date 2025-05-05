using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.WorkItems.UpdateWorkItem
{
    public class UpdateWorkItemCommandHandler(
        ISynchroRepository<WorkItem> workItemRepository,
        IEntityValidatorService<WorkItem> workItemValidator,
        IMapper mapper
        ) : IRequestHandler<UpdateWorkItemCommand>
    {
        private readonly ISynchroRepository<WorkItem> workItemRepository = workItemRepository;
        private readonly IEntityValidatorService<WorkItem> workItemValidator = workItemValidator;
        private readonly IMapper _mapper = mapper;

        public async Task Handle(UpdateWorkItemCommand request, CancellationToken cancellationToken)
        {
            await workItemValidator.EntityExistsAsync(request.Id, cancellationToken);

            var wikiPage = await workItemRepository.GetByIdAsync(request.Id, cancellationToken);

            _mapper.Map(request, wikiPage);

            await workItemRepository.UpdateAsync(wikiPage, cancellationToken);
        }
    }
}
