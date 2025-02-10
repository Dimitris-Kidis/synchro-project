using static Common.Enums.RequestStatusTypeEnum;
using static Common.Enums.RequestTypeEnum;

namespace Core.Domain.Entities
{
    public class Request : BaseEntity
    {
        public string? Text { get; set; }
        public RequestType Type { get; set; }
        public RequestStatusType Status { get; set; }
        public string? Approver { get; set; }
        public bool IsApproved { get; set; }
        public Guid SenderId { get; set; }
        public User Sender { get; set; }
        public Guid RecipientId { get; set; }
        public User Recipient { get; set; }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
    }
}
