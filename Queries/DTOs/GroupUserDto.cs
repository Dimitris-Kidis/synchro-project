﻿using static Common.Enums.RoleTypeEnum;

namespace Queries.DTOs
{
    public class GroupUserDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Image { get; set; }
        public RoleType Role { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}
