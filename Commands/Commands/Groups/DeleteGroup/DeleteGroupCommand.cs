using MediatR;

namespace Commands.Commands.Groups.DeleteGroup
{
    public class DeleteGroupCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
