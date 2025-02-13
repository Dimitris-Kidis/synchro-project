using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.CalendarEvents.DeleteCalendarEvent
{
    public class DeleteCalendarEventCommandHandler(
        ISynchroRepository<CalendarEvent> calendarEventRepository,
        IEntityValidatorService<CalendarEvent> calendarEventValidator
    ) : IRequestHandler<DeleteCalendarEventCommand>
    {
        private readonly ISynchroRepository<CalendarEvent> _calendarEventRepository = calendarEventRepository;
        private readonly IEntityValidatorService<CalendarEvent> _calendarEventValidator = calendarEventValidator;

        public async Task Handle(DeleteCalendarEventCommand request, CancellationToken cancellationToken)
        {
            await _calendarEventValidator.EntityExistsAsync(request.Id, cancellationToken);
            CalendarEvent calendarEvent = await _calendarEventRepository.GetByIdAsync(request.Id, cancellationToken);
            await _calendarEventRepository.DeleteAsync(calendarEvent, cancellationToken);
        }
    }
}
