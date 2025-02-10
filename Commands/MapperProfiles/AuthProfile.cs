using AutoMapper;
using Commands.Commands.Auth.Registration;
using Core.Domain.Entities;

namespace Commands.MapperProfiles
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<RegistrationCommand, User>()
                .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email))
                .ForMember(x => x.CreatedBy, opt => opt.MapFrom(x => x.FirstName + " " + x.LastName))
                .ForMember(x => x.CreatedAt, opt => opt.MapFrom(x => DateTimeOffset.UtcNow));
        }
    }
}