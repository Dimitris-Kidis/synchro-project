using MediatR;

namespace Commands.Commands.CalendarEvents.UpdateCalendarEvent
{
    public class UpdateCalendarEventCommand : IRequest
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? Content { get; set; }
        public IList<string>? Links { get; set; }
        public DateTimeOffset StartDateTime { get; set; }
        public DateTimeOffset EndDateTime { get; set; }
    }
}
