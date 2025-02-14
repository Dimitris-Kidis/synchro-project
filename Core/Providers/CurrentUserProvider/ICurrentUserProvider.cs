using Core.Domain.Entities;
using static Common.Enums.RoleTypeEnum;

namespace Core.Providers.CurrentUserProvider
{
    public interface ICurrentUserProvider
    {
        Guid? GetCurrentUserId();
        Task<User?> GetCurrentUserAsync();
        Task<string?> GetCurrentUserFullNameAsync();
        Task<Guid?> GetCurrentUserGroupIdAsync();
        Task<RoleType?> GetCurrentUserRoleAsync();
        Task<bool> HasGroupAsync();
        Task<bool> IsInRoleAsync(params RoleType[] roles);
    }
}
