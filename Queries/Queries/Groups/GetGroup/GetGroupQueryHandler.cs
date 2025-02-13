using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Groups.GetGroup
{
    public class GetGroupQueryHandler(
        ISynchroRepository<Group> groupRepository,
        IEntityValidatorService<Group> groupValidator,
        IMapper mapper) : IRequestHandler<GetGroupQuery, GroupDto>
    {
        private readonly ISynchroRepository<Group> groupRepository = groupRepository;
        private readonly IEntityValidatorService<Group> groupValidator = groupValidator;
        private readonly IMapper _mapper = mapper;

        public async Task<GroupDto> Handle(GetGroupQuery request, CancellationToken cancellationToken)
        {
            await groupValidator.EntityExistsAsync(request.Id, cancellationToken);

            return await groupRepository
                .GetAll()
                .Where(x => x.Id == request.Id)
                .ProjectTo<GroupDto>(_mapper.ConfigurationProvider)
                .SingleAsync(cancellationToken);
        }
    }
}
