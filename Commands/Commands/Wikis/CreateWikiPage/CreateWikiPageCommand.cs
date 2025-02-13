using MediatR;

namespace Commands.Commands.Wikis.CreateWikiPage
{
    public class CreateWikiPageCommand : IRequest
    {
        public required Guid GroupId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public IList<string> Tags { get; set; }
    }
}
