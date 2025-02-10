using Commands.Commands.Auth.Registration;
using MediatR;
using System.Reflection;

namespace Synchro.Infrastructure.Configurations
{
    public static class ConfigureMediatR
    {
        public static IServiceCollection AddMediatRConfigs(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(RegistrationCommandHandler).GetTypeInfo().Assembly));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));

            return services;
        }
    }
}
