using static Common.Enums.RequestStatusTypeEnum;
using static Common.Enums.RequestTypeEnum;

namespace Queries.DTOs
{
    public class RequestDto
    {
        public Guid Id { get; set; }
        public string? Text { get; set; }
        public RequestType Type { get; set; }
        public RequestStatusType Status { get; set; }
        public string? Approver { get; set; }
        public bool? IsApproved { get; set; }
        public Guid SenderId { get; set; }
        public string SenderName { get; set; }
        public Guid? GroupId { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
    }
}
