using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Wikis.UpdateWIkiPage
{
    public class UpdateWikiPageCommandHandler(
    ISynchroRepository<WikiPage> wikiPageRepository,
    IEntityValidatorService<WikiPage> wikiPageValidator,
    IMapper mapper
    ) : IRequestHandler<UpdateWikiPageCommand>
    {
        private readonly ISynchroRepository<WikiPage> wikiPageRepository = wikiPageRepository;
        private readonly IEntityValidatorService<WikiPage> wikiPageValidator = wikiPageValidator;
        private readonly IMapper _mapper = mapper;

        public async Task Handle(UpdateWikiPageCommand request, CancellationToken cancellationToken)
        {
            await wikiPageValidator.EntityExistsAsync(request.Id, cancellationToken);

            var wikiPage = await wikiPageRepository.GetByIdAsync(request.Id, cancellationToken);

            _mapper.Map(request, wikiPage);

            await wikiPageRepository.UpdateAsync(wikiPage, cancellationToken);
        }
    }
}
