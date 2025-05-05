using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.WorkItems.GetMyGroupWorkItems
{
    public class GetMyGroupWorkItemsQueryHandler(
        ISynchroRepository<WorkItem> workItemRepository,
        IMapper mapper) : IRequestHandler<GetMyGroupWorkItemsQuery, IEnumerable<WorkItemDto>>
    {
        private readonly ISynchroRepository<WorkItem> workItemRepository = workItemRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<WorkItemDto>> Handle(GetMyGroupWorkItemsQuery request, CancellationToken cancellationToken)
        {
            return await workItemRepository
                .GetAll()
                .Where(x => x.GroupId == request.Id)
                .ProjectTo<WorkItemDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
