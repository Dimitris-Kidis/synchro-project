using MediatR;

namespace Commands.Commands.Groups.CreateGroup
{
    public class CreateGroupCommand : IRequest<Guid>
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Code { get; set; }
    }
}
