namespace Queries.DTOs
{
    public class GroupInfoDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public string Code { get; set; }
    }
}
