using AutoMapper;
using Commands.Commands.FileStorage.AddFile;
using Core.Domain.Entities;

namespace Commands.MapperProfiles
{
    public class FileStorageProfile : Profile
    {
        public FileStorageProfile()
        {
            CreateMap<AddStorageFileCommand, StorageFile>();
        }
    }
}
