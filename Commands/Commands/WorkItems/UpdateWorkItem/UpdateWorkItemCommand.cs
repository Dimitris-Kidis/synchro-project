using Common.Enums;
using MediatR;
using static Common.Enums.PriorityTypeEnum;
using static Common.Enums.WorkItemStatusTypeEnum;
using static Common.Enums.WorkItemTypeEnum;

namespace Commands.Commands.WorkItems.UpdateWorkItem
{
    public class UpdateWorkItemCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Assignee { get; set; }
        public PriorityType Priority { get; set; }
        public WorkItemType Type { get; set; }
        public WorkItemStatusType Status { get; set; }
        public WorkItemStateType State { get; set; }
        public IList<string>? Tags { get; set; }

        public Guid GroupId { get; set; }
        public Guid UserId { get; set; }
    }
}
