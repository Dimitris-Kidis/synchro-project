using Core.Providers.CurrentUserProvider;

namespace Synchro.Infrastructure.Configurations
{
    public static class ConfigureProviders
    {
        public static IServiceCollection AddProviders(this IServiceCollection services)
        {
            services.AddScoped<ICurrentUserProvider, CurrentUserProvider>();

            return services;
        }
    }
}
