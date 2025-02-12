using Commands.Commands.Auth.Registration;
using Queries.Queries.User.GetUser;

namespace Synchro.Infrastructure.Configurations
{
    public static class ConfigureMapper
    {
        public static IServiceCollection AddMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Program).Assembly, typeof(RegistrationCommand).Assembly);
            services.AddAutoMapper(typeof(Program).Assembly, typeof(GetUserQuery).Assembly);

            return services;
        }
    }
}
