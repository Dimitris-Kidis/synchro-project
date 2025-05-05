using MediatR;

namespace Commands.Commands.WorkItems.DeleteWorkItem
{
    public class DeleteWorkItemCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
