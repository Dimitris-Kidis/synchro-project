using Core.Domain;
using Core.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Synchro.Identity;

namespace Synchro.Infrastructure.Configurations
{

    public static class ConfigureIdentity
    {
        public static IdentityBuilder AddIdentityConfiguration(this IServiceCollection services) =>
            services.AddIdentity<User, Role>(options =>
                {
                    options.User.RequireUniqueEmail = false;
                })
                .AddEntityFrameworkStores<SynchroDbContext>()
                .AddDefaultTokenProviders();
    }
}
