using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Wikis.DeleteWikiPage
{
    public class DeleteWikiPageCommandHandler(
        ISynchroRepository<WikiPage> wikiPageRepository,
        IEntityValidatorService<WikiPage> wikiPageValidator
        ) : IRequestHandler<DeleteWikiPageCommand>
    {
        private readonly ISynchroRepository<WikiPage> wikiPageRepository = wikiPageRepository;
        private readonly IEntityValidatorService<WikiPage> wikiPageValidator = wikiPageValidator;

        public async Task Handle(DeleteWikiPageCommand request, CancellationToken cancellationToken)
        {
            await wikiPageValidator.EntityExistsAsync(request.Id, cancellationToken);

            WikiPage wikiPage = await wikiPageRepository.GetByIdAsync(request.Id, cancellationToken);

            await wikiPageRepository.DeleteAsync(wikiPage, cancellationToken);
        }
    }
}
