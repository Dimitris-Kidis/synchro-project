using MediatR;
using static Common.Enums.WorkItemStatusTypeEnum;

namespace Commands.Commands.WorkItems.UpdateWorkItemStatus
{
    public class UpdateWorkItemStatusCommand : IRequest
    {
        public Guid Id { get; set; }
        public WorkItemStatusType Status { get; set; }
    }
}
