using Commands.Commands.Auth.Registration;

namespace Synchro.Infrastructure.Configurations
{
    public static class ConfigureMapper
    {
        public static IServiceCollection AddMapper(this IServiceCollection services)
        {

            services.AddAutoMapper(typeof(Program).Assembly, typeof(RegistrationCommand).Assembly);

            return services;
        }
    }
}
