using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;

namespace Commands.Commands.Wikis.CreateWikiPage
{
    public class CreateWikiPageCommandHandler(
    ISynchroRepository<WikiPage> wikiPageRepository,
    IMapper mapper
    ) : IRequestHandler<CreateWikiPageCommand>
    {
        private readonly ISynchroRepository<WikiPage> wikiPageRepository = wikiPageRepository;
        private readonly IMapper mapper = mapper;

        public Task Handle(CreateWikiPageCommand request, CancellationToken cancellationToken)
        {
            var wikiPage = mapper.Map<WikiPage>(request);

            return wikiPageRepository.AddAsync(wikiPage, cancellationToken);
        }
    }
}
