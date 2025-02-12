using Common.Enums;
using Core.Interfaces;
using System.ComponentModel.DataAnnotations;
using static Common.Enums.PriorityTypeEnum;
using static Common.Enums.WorkItemStatusTypeEnum;
using static Common.Enums.WorkItemTypeEnum;

namespace Core.Domain.Entities
{
    public class WorkItem : IBaseEntity
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Assignee { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsModified { get; set; }
        public bool IsArchived { get; set; }
        public PriorityType Priority { get; set; }
        public WorkItemType Type { get; set; }
        public WorkItemStatusType Status { get; set; }
        public WorkItemStateType State { get; set; }
        public Guid GroupId { get; set; }
        public Guid UserId { get; set; }
        public Group Group { get; set; }
        public User User { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
