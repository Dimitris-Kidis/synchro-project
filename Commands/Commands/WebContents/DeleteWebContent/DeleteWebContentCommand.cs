using MediatR;

namespace Commands.Commands.WebContents.DeleteWebContent
{
    public class DeleteWebContentCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
