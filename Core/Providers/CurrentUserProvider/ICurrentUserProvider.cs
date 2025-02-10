using Core.Domain.Entities;
using static Common.Enums.RoleTypeEnum;

namespace Core.Providers.CurrentUserProvider
{
    public interface ICurrentUserProvider
    {
        Guid? GetCurrentUserId();
        Task<User?> GetCurrentUserAsync();
        Task<string?> GetCurrentUserFullNameAsync();
        Task<RoleType?> GetCurrentUserRoleAsync();
        Task<bool> IsInRoleAsync(params RoleType[] roles);
    }
}
