using MediatR;

namespace Commands.Commands.CalendarEvents.CreateCalendarEvent
{
    public class CreateCalendarEventCommand : IRequest
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? Content { get; set; }
        public IList<string>? Links { get; set; }
        public DateTimeOffset StartDateTime { get; set; }
        public DateTimeOffset EndDateTime { get; set; }
    }
}
