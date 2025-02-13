using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.CalendarEvents.UpdateCalendarEvent
{
    public class UpdateCalendarEventCommandHandler(
        ISynchroRepository<CalendarEvent> calendarEventRepository,
        IEntityValidatorService<CalendarEvent> calendarEventValidator,
        IMapper mapper
    ) : IRequestHandler<UpdateCalendarEventCommand>
    {
        private readonly ISynchroRepository<CalendarEvent> _calendarEventRepository = calendarEventRepository;
        private readonly IEntityValidatorService<CalendarEvent> _calendarEventValidator = calendarEventValidator;
        private readonly IMapper _mapper = mapper;

        public async Task Handle(UpdateCalendarEventCommand request, CancellationToken cancellationToken)
        {
            await _calendarEventValidator.EntityExistsAsync(request.Id, cancellationToken);
            var calendarEvent = await _calendarEventRepository.GetByIdAsync(request.Id, cancellationToken);
            _mapper.Map(request, calendarEvent);
            await _calendarEventRepository.UpdateAsync(calendarEvent, cancellationToken);
        }
    }
}
