using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Exceptions;
using Core.Domain.Entities;
using Core.Providers.CurrentUserProvider;
using Core.Repositories.SynchroRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;
using static Common.Enums.RequestTypeEnum;
using static Common.Enums.RoleTypeEnum;

namespace Queries.Queries.Requests.GetMyRequests
{
    public class GetMyRequestsQueryHandler(
        ISynchroRepository<Request> requestRepository,
        ICurrentUserProvider currentUserProvider,
        IMapper mapper) : IRequestHandler<GetMyRequestsQuery, IEnumerable<RequestDto>>
    {
        private readonly ISynchroRepository<Request> requestRepository = requestRepository;
        private readonly ICurrentUserProvider currentUserProvider = currentUserProvider;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<RequestDto>> Handle(GetMyRequestsQuery request, CancellationToken cancellationToken)
        {
            var currentUser = await currentUserProvider.GetCurrentUserAsync();

            if (currentUser == null)
            {
                throw new BusinessValidationException("User not found");
            }

            var query = requestRepository.GetAll().Where(x => x.SenderId == currentUser.Id);

            switch (currentUser.Role)
            {
                case RoleType.Admin:
                    query = query.Where(x => x.Type == RequestType.BecomeManager || x.Type == RequestType.BecomeAdmin || x.Type == RequestType.CreateGroup);
                    break;
                case RoleType.Manager:
                    var hasGroup = await currentUserProvider.HasGroupAsync();

                    if (hasGroup)
                    {
                        query = query.Where(x => x.Type == RequestType.GetInGroup);
                    }
                    break;
                case RoleType.Student:
                    break;
                default:
                    throw new BusinessValidationException("Unknown Role Type");

            }

            return await query
                .ProjectTo<RequestDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
