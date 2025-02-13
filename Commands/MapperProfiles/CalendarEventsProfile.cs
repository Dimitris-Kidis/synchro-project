using AutoMapper;
using Commands.Commands.CalendarEvents.CreateCalendarEvent;
using Commands.Commands.CalendarEvents.UpdateCalendarEvent;
using Core.Domain.Entities;

namespace Commands.MapperProfiles
{
    public class CalendarEventsProfile : Profile
    {
        public CalendarEventsProfile()
        {
            CreateMap<CreateCalendarEventCommand, CalendarEvent>();
            CreateMap<UpdateCalendarEventCommand, CalendarEvent>()
                .ForMember(x => x.Id, opt => opt.Ignore());
        }
    }
}
