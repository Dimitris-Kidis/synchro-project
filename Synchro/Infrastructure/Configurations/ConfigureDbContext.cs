using Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace Synchro.Infrastructure.Configurations
{
    public static class ConfigureDbContext
    {
        public static IServiceCollection AddDbContext(this IServiceCollection services, WebApplicationBuilder builder) =>
            services.AddDbContext<SynchroDbContext>(opt =>
            {
                opt.UseSqlServer(builder.Configuration.GetConnectionString("connectionString"));
            });
    }
}
