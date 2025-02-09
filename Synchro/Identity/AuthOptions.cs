namespace Synchro.Identity
{
    public class AuthOptions
    {
        public static string Issuer { get; private set; } = string.Empty;
        public static string Audience { get; private set; } = string.Empty;
        public static string Key { get; private set; } = string.Empty;
        public static int LifetimeDays { get; private set; } = 30;

        public static void Configure(IConfiguration configuration)
        {
            IConfigurationSection jwtSettings = configuration.GetSection("JwtSettings");

            Issuer = jwtSettings["Issuer"] ?? throw new InvalidOperationException("Issuer is not configured");
            Audience = jwtSettings["Audience"] ?? throw new InvalidOperationException("Audience is not configured");
            Key = jwtSettings["Key"] ?? throw new InvalidOperationException("Key is not configured");
            LifetimeDays = int.TryParse(jwtSettings["LifetimeDays"], out int lifetime) ? lifetime : 30;
        }
    }
}
