using Core.Repositories.GenericRepository;
using Core.Repositories.SynchroRepository;
using Core.Repositories.UserRepository;

namespace Synchro.Infrastructure.Configurations
{
    public static class ConfigureRepository
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped(typeof(ISynchroRepository<>), typeof(SynchroRepository<>));
            services.AddScoped(typeof(IUserRepository), typeof(UserRepository));

            return services;
        }
    }
}
