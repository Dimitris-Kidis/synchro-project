using Core.Domain.Entities;
using Core.Domain.EntitiesConfigurations;
using Microsoft.EntityFrameworkCore;

namespace Core.Domain
{
    public class SynchroDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<CalendarEvent> CalendarEvents { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<StorageFile> StorageFiles { get; set; }
        public DbSet<WebContent> WebContents { get; set; }
        public DbSet<WikiPage> WikiPages { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }

        public SynchroDbContext() { }

        public SynchroDbContext(DbContextOptions<SynchroDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new RequestsConfiguration());
        }
    }
}
