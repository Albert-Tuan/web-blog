using WebBlog.Api.Models;

namespace WebBlog.Api.Contracts;

public record PostResponse(int Id, string Title, string Excerpt, string Content,
    string Author, DateTime PublishedAt, List<string> Tags, int? AuthorId)
{
    public static PostResponse From(Post post) => new(post.Id, post.Title, post.Excerpt,
        post.Content, post.Author, post.PublishedAt, post.Tags, post.AuthorId);
}
