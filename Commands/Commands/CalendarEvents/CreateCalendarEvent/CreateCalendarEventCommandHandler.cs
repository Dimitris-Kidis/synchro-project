using AutoMapper;
using Common.Exceptions;
using Core.Domain.Entities;
using Core.Providers.CurrentUserProvider;
using Core.Repositories.SynchroRepository;
using MediatR;

namespace Commands.Commands.CalendarEvents.CreateCalendarEvent
{
    public class CreateCalendarEventCommandHandler(
        ISynchroRepository<CalendarEvent> calendarEventRepository,
        ICurrentUserProvider currentUserProvider,
        IMapper mapper
    ) : IRequestHandler<CreateCalendarEventCommand>
    {
        private readonly ISynchroRepository<CalendarEvent> _calendarEventRepository = calendarEventRepository;
        private readonly ICurrentUserProvider currentUserProvider = currentUserProvider;
        private readonly IMapper _mapper = mapper;

        public async Task Handle(CreateCalendarEventCommand request, CancellationToken cancellationToken)
        {
            Guid? currentUserGroupId = await currentUserProvider.GetCurrentUserGroupIdAsync();

            if (currentUserGroupId == null)
            {
                throw new BusinessValidationException("User not found");
            }

            var calendarEvent = _mapper.Map<CalendarEvent>(request);

            calendarEvent.GroupId = currentUserGroupId.Value;

            await _calendarEventRepository.AddAsync(calendarEvent, cancellationToken);
        }
    }
}
