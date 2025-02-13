using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.WebContents.DeleteWebContent
{
    public class DeleteWebContentCommandHandler(
        ISynchroRepository<WebContent> webContentRepository,
        IEntityValidatorService<WebContent> webContentValidator
    ) : IRequestHandler<DeleteWebContentCommand>
    {
        private readonly ISynchroRepository<WebContent> webContentRepository = webContentRepository;
        private readonly IEntityValidatorService<WebContent> webContentValidator = webContentValidator;

        public async Task Handle(DeleteWebContentCommand request, CancellationToken cancellationToken)
        {
            await webContentValidator.EntityExistsAsync(request.Id, cancellationToken);

            WebContent webContent = await webContentRepository.GetByIdAsync(request.Id, cancellationToken);

            await webContentRepository.DeleteAsync(webContent, cancellationToken);
        }
    }
}
