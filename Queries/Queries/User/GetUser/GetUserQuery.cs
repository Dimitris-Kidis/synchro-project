using MediatR;
using Queries.Queries.DTOs;

namespace Queries.Queries.User.GetUser
{
    public class GetUserQuery : IRequest<UserDto>
    {
        public Guid Id { get; set; }
    }
}
