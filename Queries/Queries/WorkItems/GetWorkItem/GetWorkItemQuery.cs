using MediatR;
using Queries.DTOs;

namespace Queries.Queries.WorkItems.GetWorkItem
{
    public class GetWorkItemQuery : IRequest<WorkItemDto>
    {
        public Guid Id { get; set; }
    }
}
