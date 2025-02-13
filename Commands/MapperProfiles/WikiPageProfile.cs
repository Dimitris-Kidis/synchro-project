using AutoMapper;
using Commands.Commands.Wikis.CreateWikiPage;
using Commands.Commands.Wikis.UpdateWIkiPage;
using Core.Domain.Entities;

namespace Commands.MapperProfiles
{
    public class WikiPageProfile : Profile
    {
        public WikiPageProfile()
        {
            CreateMap<CreateWikiPageCommand, WikiPage>();
            CreateMap<UpdateWikiPageCommand, WikiPage>()
                .ForMember(x => x.Id, opt => opt.Ignore());
        }
    }
}
