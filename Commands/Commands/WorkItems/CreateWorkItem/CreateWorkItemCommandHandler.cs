using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;
using Queries.DTOs;

namespace Commands.Commands.WorkItems.CreateWorkItem
{
    public class CreateWorkItemCommandHandler(
        ISynchroRepository<WorkItem> workItemsRepository,
        IMapper mapper
        ) : IRequestHandler<CreateWorkItemCommand, WorkItemDto>
    {
        private readonly ISynchroRepository<WorkItem> workItemsRepository = workItemsRepository;
        private readonly IMapper mapper = mapper;

        public async Task<WorkItemDto> Handle(CreateWorkItemCommand request, CancellationToken cancellationToken)
        {
            var workItem = mapper.Map<WorkItem>(request);

            await workItemsRepository.AddAsync(workItem, cancellationToken);

            return mapper.Map<WorkItemDto>(workItem); ;
        }
    }
}
