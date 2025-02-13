using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.CalendarEvents.GetCalendarEvent
{
    public class GetCalendarEventQueryHandler(
    ISynchroRepository<CalendarEvent> calendarEventRepository,
    IEntityValidatorService<CalendarEvent> calendarEventValidator,
    IMapper mapper) : IRequestHandler<GetCalendarEventQuery, CalendarEventDto>
    {
        private readonly ISynchroRepository<CalendarEvent> calendarEventRepository = calendarEventRepository;
        private readonly IEntityValidatorService<CalendarEvent> calendarEventValidator = calendarEventValidator;
        private readonly IMapper _mapper = mapper;

        public async Task<CalendarEventDto> Handle(GetCalendarEventQuery request, CancellationToken cancellationToken)
        {
            await calendarEventValidator.EntityExistsAsync(request.Id, cancellationToken);

            return await calendarEventRepository
                .GetAll()
                .Where(x => x.Id == request.Id)
                .ProjectTo<CalendarEventDto>(_mapper.ConfigurationProvider)
                .SingleAsync(cancellationToken);
        }
    }
}
