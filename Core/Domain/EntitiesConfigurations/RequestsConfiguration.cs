using Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Domain.EntitiesConfigurations
{
    public class RequestsConfiguration : IEntityTypeConfiguration<Request>
    {
        public void Configure(EntityTypeBuilder<Request> builder)
        {
            builder.HasOne(r => r.Group)
                .WithMany(g => g.Requests)
                .HasForeignKey(r => r.GroupId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(r => r.Sender)
                .WithMany(u => u.Requests)
                .HasForeignKey(r => r.SenderId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}