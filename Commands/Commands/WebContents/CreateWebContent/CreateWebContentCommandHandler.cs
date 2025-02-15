using AutoMapper;
using Common.Exceptions;
using Core.Domain.Entities;
using Core.Providers.CurrentUserProvider;
using Core.Repositories.SynchroRepository;
using MediatR;

namespace Commands.Commands.WebContents.CreateWebContent
{
    public class CreateWebContentCommandHandler(
    ISynchroRepository<WebContent> webContentRepository,
    ICurrentUserProvider currentUserProvider,
    IMapper mapper
    ) : IRequestHandler<CreateWebContentCommand>
    {
        private readonly ISynchroRepository<WebContent> webContentRepository = webContentRepository;
        private readonly ICurrentUserProvider currentUserProvider = currentUserProvider;
        private readonly IMapper mapper = mapper;

        public async Task Handle(CreateWebContentCommand request, CancellationToken cancellationToken)
        {
            Guid? currentUserId = currentUserProvider.GetCurrentUserId();

            if (currentUserId == null)
            {
                throw new BusinessValidationException("User not found");
            }

            var webContent = mapper.Map<WebContent>(request);
            webContent.UserId = currentUserId.Value;
            webContent.Author = await currentUserProvider.GetCurrentUserFullNameAsync();

            await webContentRepository.AddAsync(webContent, cancellationToken);
        }
    }
}
