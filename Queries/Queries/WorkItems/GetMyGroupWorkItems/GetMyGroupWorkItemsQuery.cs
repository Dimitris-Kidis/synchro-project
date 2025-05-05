using MediatR;
using Queries.DTOs;

namespace Queries.Queries.WorkItems.GetMyGroupWorkItems
{
    public class GetMyGroupWorkItemsQuery : IRequest<IEnumerable<WorkItemDto>>
    {
        public Guid Id { get; set; }
    }
}
