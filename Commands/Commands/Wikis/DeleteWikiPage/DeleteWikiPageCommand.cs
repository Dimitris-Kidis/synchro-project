using MediatR;

namespace Commands.Commands.Wikis.DeleteWikiPage
{
    public class DeleteWikiPageCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
