namespace WebBlog.Api.Models;

// The ID is inside an encrypted/signed HttpOnly cookie, never returned as JSON.
public class AuthSession
{
    public string Id { get; set; } = "";
    public int UserId { get; set; }
    public DateTime ExpiresAt { get; set; }
}
