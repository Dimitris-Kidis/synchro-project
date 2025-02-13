using AutoMapper;
using Commands.Commands.WebContents.CreateWebContent;
using Commands.Commands.WebContents.UpdateWebContent;
using Core.Domain.Entities;

namespace Commands.MapperProfiles
{
    public class WebContentProfile : Profile
    {
        public WebContentProfile()
        {
            CreateMap<CreateWebContentCommand, WebContent>();
            CreateMap<UpdateWebContentCommand, WebContent>()
                .ForMember(x => x.Id, opt => opt.Ignore());
        }
    }
}
