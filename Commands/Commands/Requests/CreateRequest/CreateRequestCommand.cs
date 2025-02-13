using MediatR;
using static Common.Enums.RequestTypeEnum;

namespace Commands.Commands.Requests.CreateRequest
{
    public class CreateRequestCommand : IRequest
    {
        public Guid SenderId { get; set; }
        public string SenderName { get; set; }
        public string? Text { get; set; }
        public RequestType Type { get; set; }
        public Guid? GroupId { get; set; }
    }
}
