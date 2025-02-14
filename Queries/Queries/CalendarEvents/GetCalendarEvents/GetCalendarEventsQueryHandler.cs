using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.CalendarEvents.GetCalendarEvents
{
    public class GetCalendarEventsQueryHandler(
        ISynchroRepository<CalendarEvent> calendarEventRepository,
        IMapper mapper) : IRequestHandler<GetCalendarEventsQuery, IEnumerable<CalendarEventDto>>
    {
        private readonly ISynchroRepository<CalendarEvent> calendarEventRepository = calendarEventRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<CalendarEventDto>> Handle(GetCalendarEventsQuery request, CancellationToken cancellationToken)
        {
            return await calendarEventRepository
                .GetAll()
                .Where(x => x.GroupId == request.Id)
                .ProjectTo<CalendarEventDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
