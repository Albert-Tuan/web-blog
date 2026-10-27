namespace WebBlog.Api.Models;

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Excerpt { get; set; } = "";
    public string Content { get; set; } = "";
    public string Author { get; set; } = "";
    public DateTime PublishedAt { get; set; }
    public List<string> Tags { get; set; } = [];
}
