using MediatR;

namespace Commands.Commands.Requests.DeleteRequest
{
    public class DeleteRequestCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
