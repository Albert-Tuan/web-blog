using Microsoft.EntityFrameworkCore;
using WebBlog.Api.Models;

namespace WebBlog.Api.Data;

public class BlogDbContext(DbContextOptions<BlogDbContext> options) : DbContext(options)
{
    public DbSet<Post> Posts => Set<Post>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var post = modelBuilder.Entity<Post>();
        post.Property(p => p.Title).HasMaxLength(200).IsRequired();
        post.Property(p => p.Excerpt).HasMaxLength(500).IsRequired();
        post.Property(p => p.Content).HasMaxLength(100000).IsRequired();
        post.Property(p => p.Author).HasMaxLength(100).IsRequired();
        post.HasIndex(p => p.PublishedAt);
        post.Property(p => p.PublishedAt).HasConversion(
            value => value, value => DateTime.SpecifyKind(value, DateTimeKind.Utc));
        // EF Core stores this primitive collection as JSON in SQLite.
        post.Property(p => p.Tags).IsRequired();
        post.HasData(SeedPosts.All);
    }
}
