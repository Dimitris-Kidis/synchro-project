using MediatR;

namespace Commands.Commands.CalendarEvents.DeleteCalendarEvent
{
    public class DeleteCalendarEventCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
