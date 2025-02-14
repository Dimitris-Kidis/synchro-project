using MediatR;
using Queries.DTOs;

namespace Queries.Queries.CalendarEvents.GetCalendarEvents
{
    public class GetCalendarEventsQuery : IRequest<IEnumerable<CalendarEventDto>>
    {
        public Guid Id { get; set; }
    }
}
