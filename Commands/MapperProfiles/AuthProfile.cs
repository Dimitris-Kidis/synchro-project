using AutoMapper;
using Commands.Commands.Auth.Registration;
using Common.Helpers.SecretKeyGenerator;
using Core.Domain.Entities;
using static Common.Enums.RoleTypeEnum;

namespace Commands.MapperProfiles
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<RegistrationCommand, User>()
                .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email))
                .ForMember(x => x.Role, opt => opt.MapFrom(x => RoleType.Student))
                .ForMember(x => x.CreatedBy, opt => opt.MapFrom(x => x.FirstName + " " + x.LastName))
                .ForMember(x => x.SecretKey, opt => opt.MapFrom(x => SecretKeyGenerator.GenerateSecretKey()))
                .ForMember(x => x.CreatedAt, opt => opt.MapFrom(x => DateTimeOffset.UtcNow));
        }
    }
}