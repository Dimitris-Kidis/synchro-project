using Commands.Commands.Auth.Registration;
using Queries.Queries.Users.GetUser;

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
