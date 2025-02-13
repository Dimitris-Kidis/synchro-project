using AutoMapper;
using Common.Exceptions;
using Core.Domain.Entities;
using Core.Providers.CurrentUserProvider;
using Core.Repositories.SynchroRepository;
using Core.Repositories.UserRepository;
using Core.Services.EntityValidator;
using MediatR;
using static Common.Enums.RequestStatusTypeEnum;
using static Common.Enums.RequestTypeEnum;
using static Common.Enums.RoleTypeEnum;

namespace Commands.Commands.Requests.UpdateRequest
{
    public class UpdateRequestCommandHandler(
    ISynchroRepository<Request> requestRepository,
    ISynchroRepository<Group> groupRepository,
    IUserRepository userRepository,
    IEntityValidatorService<Request> requestValidator,
    ICurrentUserProvider currentUserProvider,
    IMapper mapper
    ) : IRequestHandler<UpdateRequestCommand>
    {
        private readonly ISynchroRepository<Request> requestRepository = requestRepository;
        private readonly ISynchroRepository<Group> groupRepository = groupRepository;
        private readonly IUserRepository userRepository = userRepository;
        private readonly IEntityValidatorService<Request> requestValidator = requestValidator;
        private readonly ICurrentUserProvider currentUserProvider = currentUserProvider;
        private readonly IMapper mapper = mapper;

        public async Task Handle(UpdateRequestCommand command, CancellationToken cancellationToken)
        {
            await requestValidator.EntityExistsAsync(command.Id, cancellationToken);
            var request = await requestRepository.GetByIdAsync(command.Id, cancellationToken);
            mapper.Map(command, request);

            var userFullName = await currentUserProvider.GetCurrentUserFullNameAsync();

            request.Status = RequestStatusType.Finished;
            request.Approver = userFullName;

            await requestRepository.UpdateAsync(request, cancellationToken);

            if (!command.IsApproved)
            {
                return;
            }

            switch (request.Type)
            {
                case RequestType.CreateGroup:
                    await groupRepository.UpdateAsync(x => x.Id == request.GroupId, x => new Group { IsApprovedToBeCreated = request.IsApproved, ParticipantsNumber = 1 }, cancellationToken);
                    await userRepository.UpdateAsync(x => x.Id == request.SenderId, x => new User { GroupId = request.GroupId }, cancellationToken);
                    break;
                case RequestType.GetInGroup:
                    await userRepository.UpdateAsync(x => x.Id == request.SenderId, x => new User { GroupId = request.GroupId }, cancellationToken);
                    break;
                case RequestType.BecomeManager:
                case RequestType.BecomeAdmin:
                    var role = request.Type == RequestType.BecomeAdmin ? RoleType.Admin : RoleType.Manager;
                    await userRepository.UpdateAsync(x => x.Id == request.SenderId, x => new User { Role = role }, cancellationToken);
                    break;
                default:
                    throw new BusinessValidationException("Unknown RequestType");
            }
        }
    }
}
