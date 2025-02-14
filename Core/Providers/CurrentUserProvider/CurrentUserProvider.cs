using Core.Domain.Entities;
using Core.Repositories.UserRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using static Common.Enums.RoleTypeEnum;

namespace Core.Providers.CurrentUserProvider
{
    public class CurrentUserProvider(IHttpContextAccessor httpContextAccessor, IUserRepository userRepository) : ICurrentUserProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly IUserRepository _userRepository = userRepository;

        public Guid? GetCurrentUserId()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var userId) ? userId : null;
        }

        public async Task<User?> GetCurrentUserAsync()
        {
            var userId = GetCurrentUserId();
            if (userId == null) return null;

            return await _userRepository.GetByIdAsync((Guid)userId);
        }

        public async Task<string?> GetCurrentUserFullNameAsync()
        {
            var user = await GetCurrentUserAsync();
            return user == null ? null : $"{user.FirstName} {user.LastName}".Trim();
        }

        public async Task<Guid?> GetCurrentUserGroupIdAsync()
        {
            var user = await GetCurrentUserAsync();
            return user?.GroupId;
        }

        public async Task<RoleType?> GetCurrentUserRoleAsync()
        {
            var user = await GetCurrentUserAsync();
            return user?.Role;
        }

        public async Task<bool> IsInRoleAsync(params RoleType[] roles)
        {
            var userRole = await GetCurrentUserRoleAsync();
            return userRole != null && roles.Contains(userRole.Value);
        }

        public async Task<bool> HasGroupAsync()
        {
            var user = await GetCurrentUserAsync();
            return user?.GroupId != null;
        }
    }
}
