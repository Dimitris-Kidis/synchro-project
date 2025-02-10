using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Synchro.Identity
{
    public static class JwtHandler
    {
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AuthOptions.Key));
        }

        public static SigningCredentials GetSigningCredentials()
        {
            var key = GetSymmetricSecurityKey();

            return new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        }
        public static List<Claim> GetClaims(Guid userId)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, userId.ToString()),
            };
            return claims;
        }
        public static JwtSecurityToken GenerateTokenOptions(Guid userId)
        {
            var claims = GetClaims(userId);

            return new JwtSecurityToken(
                issuer: AuthOptions.Issuer,
                audience: AuthOptions.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(AuthOptions.LifetimeDays),
                signingCredentials: GetSigningCredentials());
        }

        public static string GenerateToken(Guid userId)
        {
            var token = GenerateTokenOptions(userId);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}