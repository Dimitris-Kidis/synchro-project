using AutoMapper;
using Core.Domain.Entities;
using Queries.DTOs;

namespace Queries.MapperProfiles
{
    public class StorageFileProfile : Profile
    {
        public StorageFileProfile()
        {
            CreateMap<StorageFile, StorageFileDto>();
        }
    }
}
