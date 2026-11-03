using Microsoft.AspNetCore.Identity;
using WebBlog.Api.Models;

namespace WebBlog.Api.Auth;

// A missing account still performs a password-hash verification, like a wrong password.
public sealed class DummyPasswordHash
{
    public string Value { get; } = new PasswordHasher<AppUser>()
        .HashPassword(new AppUser(), Guid.NewGuid().ToString("N"));
}
