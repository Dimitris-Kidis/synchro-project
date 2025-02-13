using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;

namespace Commands.Commands.Requests.CreateRequest
{
    public class CreateRequestCommandHandler(
     ISynchroRepository<Request> requestRepository,
     IMapper mapper
     ) : IRequestHandler<CreateRequestCommand>
    {
        private readonly ISynchroRepository<Request> requestRepository = requestRepository;
        private readonly IMapper mapper = mapper;

        public Task Handle(CreateRequestCommand request, CancellationToken cancellationToken)
        {
            var requestEntity = mapper.Map<Request>(request);

            return requestRepository.AddAsync(requestEntity, cancellationToken);
        }
    }
}
