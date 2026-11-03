using WebBlog.Api.Models;

namespace WebBlog.Api.Contracts;

public record UserResponse(int Id, string Email, DateTime CreatedAt)
{
    public static UserResponse From(AppUser user) => new(user.Id, user.Email, user.CreatedAt);
}
