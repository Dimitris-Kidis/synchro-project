using MediatR;
using Queries.DTOs;

namespace Queries.Queries.CalendarEvents.GetCalendarEvent
{
    public class GetCalendarEventQuery : IRequest<CalendarEventDto>
    {
        public Guid Id { get; set; }
    }
}
