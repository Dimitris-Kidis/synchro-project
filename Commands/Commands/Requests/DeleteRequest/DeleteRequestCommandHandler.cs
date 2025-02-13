using Commands.Commands.CalendarEvents.DeleteCalendarEvent;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Requests.DeleteRequest
{
    public class DeleteRequestCommandHandler(
    ISynchroRepository<Request> requestRepository,
    IEntityValidatorService<Request> requestValidator
    ) : IRequestHandler<DeleteCalendarEventCommand>
    {
        private readonly ISynchroRepository<Request> _requestRepository = requestRepository;
        private readonly IEntityValidatorService<Request> _requestEventValidator = requestValidator;

        public async Task Handle(DeleteCalendarEventCommand command, CancellationToken cancellationToken)
        {
            await _requestEventValidator.EntityExistsAsync(command.Id, cancellationToken);
            Request request = await _requestRepository.GetByIdAsync(command.Id, cancellationToken);
            await _requestRepository.DeleteAsync(request, cancellationToken);
        }
    }
}
