using MediatR;

namespace Commands.Commands.Groups.UpdateGroup
{
    public class UpdateGroupCommand : IRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Code { get; set; }
        public string? Image { get; set; }
        public int ParticipantsLimitNumber { get; set; }
    }
}
