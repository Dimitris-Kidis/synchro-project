using System.Text;

namespace Common.Helpers.SecretKeyGenerator
{
    public static class SecretKeyGenerator
    {
        private static readonly Random _random = new();
        private const string Characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        public static string GenerateSecretKey()
        {
            return string.Join("-", Enumerable.Range(0, 3).Select(_ => GenerateSegment()));
        }

        private static string GenerateSegment()
        {
            var sb = new StringBuilder(3);
            for (int i = 0; i < 3; i++)
            {
                sb.Append(Characters[_random.Next(Characters.Length)]);
            }
            return sb.ToString();
        }
    }
}
