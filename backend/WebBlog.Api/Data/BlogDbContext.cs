using Microsoft.EntityFrameworkCore;
using WebBlog.Api.Models;

namespace WebBlog.Api.Data;

public class BlogDbContext(DbContextOptions<BlogDbContext> options) : DbContext(options)
{
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<AppUser> Users => Set<AppUser>();
    public DbSet<AuthSession> AuthSessions => Set<AuthSession>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var post = modelBuilder.Entity<Post>();
        post.Property(p => p.Title).HasMaxLength(200).IsRequired();
        post.Property(p => p.Excerpt).HasMaxLength(500).IsRequired();
        post.Property(p => p.Content).HasMaxLength(100000).IsRequired();
        post.Property(p => p.Author).HasMaxLength(254).IsRequired();
        post.HasOne<AppUser>().WithMany().HasForeignKey(p => p.AuthorId).OnDelete(DeleteBehavior.SetNull);
        post.HasIndex(p => p.PublishedAt);
        post.Property(p => p.PublishedAt).HasConversion(
            value => value, value => DateTime.SpecifyKind(value, DateTimeKind.Utc));
        // EF Core stores this primitive collection as JSON in SQLite.
        post.Property(p => p.Tags).IsRequired();
        post.HasData(SeedPosts.All);

        var user = modelBuilder.Entity<AppUser>();
        user.Property(u => u.Email).HasMaxLength(254).IsRequired();
        user.Property(u => u.NormalizedEmail).HasMaxLength(254).IsRequired();
        user.HasIndex(u => u.NormalizedEmail).IsUnique();
        user.Property(u => u.PasswordHash).IsRequired();
        user.Property(u => u.CreatedAt).HasConversion(value => value, value => DateTime.SpecifyKind(value, DateTimeKind.Utc));

        var session = modelBuilder.Entity<AuthSession>();
        session.Property(s => s.Id).HasMaxLength(32);
        session.HasOne<AppUser>().WithMany().HasForeignKey(s => s.UserId).OnDelete(DeleteBehavior.Cascade);
        session.HasIndex(s => s.ExpiresAt);
        session.Property(s => s.ExpiresAt).HasConversion(value => value, value => DateTime.SpecifyKind(value, DateTimeKind.Utc));
    }
}
