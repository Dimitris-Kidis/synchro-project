using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.WorkItems.GetWorkItem
{
    public class GetWorkItemQueryHandler(
        ISynchroRepository<WorkItem> workItemRepository,
        IEntityValidatorService<WorkItem> workItemValidator,
        IMapper mapper) : IRequestHandler<GetWorkItemQuery, WorkItemDto>
    {
        private readonly ISynchroRepository<WorkItem> workItemRepository = workItemRepository;
        private readonly IEntityValidatorService<WorkItem> workItemValidator = workItemValidator;
        private readonly IMapper _mapper = mapper;

        public async Task<WorkItemDto> Handle(GetWorkItemQuery request, CancellationToken cancellationToken)
        {
            await workItemValidator.EntityExistsAsync(request.Id, cancellationToken);

            return await workItemRepository
                .GetAll()
                .Where(x => x.Id == request.Id)
                .ProjectTo<WorkItemDto>(_mapper.ConfigurationProvider)
                .SingleAsync(cancellationToken);
        }
    }
}
