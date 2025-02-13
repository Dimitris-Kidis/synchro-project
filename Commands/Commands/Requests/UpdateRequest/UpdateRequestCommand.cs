using MediatR;

namespace Commands.Commands.Requests.UpdateRequest
{
    public class UpdateRequestCommand : IRequest
    {
        public Guid Id { get; set; }
        public bool IsApproved { get; set; }
    }
}
