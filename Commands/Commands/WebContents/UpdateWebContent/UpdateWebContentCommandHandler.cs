using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.WebContents.UpdateWebContent
{
    public class UpdateWebContentCommandHandler(
        ISynchroRepository<WebContent> webContentRepository,
        IEntityValidatorService<WebContent> webContentValidator,
        IMapper mapper
    ) : IRequestHandler<UpdateWebContentCommand>
    {
        private readonly ISynchroRepository<WebContent> webContentRepository = webContentRepository;
        private readonly IEntityValidatorService<WebContent> webContentValidator = webContentValidator;
        private readonly IMapper _mapper = mapper;

        public async Task Handle(UpdateWebContentCommand request, CancellationToken cancellationToken)
        {
            await webContentValidator.EntityExistsAsync(request.Id, cancellationToken);

            var webContent = await webContentRepository.GetByIdAsync(request.Id, cancellationToken);

            _mapper.Map(request, webContent);

            await webContentRepository.UpdateAsync(webContent, cancellationToken);
        }
    }
}
