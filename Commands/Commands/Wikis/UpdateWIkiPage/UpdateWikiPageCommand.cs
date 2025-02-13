using MediatR;

namespace Commands.Commands.Wikis.UpdateWIkiPage
{
    public class UpdateWikiPageCommand : IRequest
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public IList<string> Tags { get; set; }
    }
}
