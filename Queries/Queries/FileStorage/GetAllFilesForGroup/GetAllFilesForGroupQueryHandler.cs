using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.FileStorage.GetAllFilesForGroup
{
    public class GetAllFilesForGroupQueryHandler(
        ISynchroRepository<StorageFile> storageRepository,
        IMapper mapper) : IRequestHandler<GetAllFilesForGroupQuery, IEnumerable<StorageFileDto>>
    {
        private readonly ISynchroRepository<StorageFile> storageRepository = storageRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<StorageFileDto>> Handle(GetAllFilesForGroupQuery request, CancellationToken cancellationToken)
        {
            return await storageRepository
                .GetAll()
                .Where(x => x.GroupId == request.Id)
                .ProjectTo<StorageFileDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
