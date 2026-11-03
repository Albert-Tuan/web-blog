using System.Security.Claims;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using WebBlog.Api.Auth;
using WebBlog.Api.Contracts;
using WebBlog.Api.Data;
using WebBlog.Api.Models;

namespace WebBlog.Api.Controllers;

[ApiController]
[Route("api/auth")]
[ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
public class AuthController(BlogDbContext db, IPasswordHasher<AppUser> hasher,
    DummyPasswordHash dummyHash, IAntiforgery antiforgery) : ControllerBase
{
    [HttpGet("csrf")]
    public IActionResult Csrf()
    {
        var tokens = antiforgery.GetAndStoreTokens(HttpContext);
        return Ok(new { Token = tokens.RequestToken });
    }

    [HttpPost("register"), EnableRateLimiting("auth")]
    public async Task<ActionResult<UserResponse>> Register(RegisterRequest request, CancellationToken ct)
    {
        var normalizedEmail = request.Email.ToUpperInvariant();
        if (await db.Users.AnyAsync(user => user.NormalizedEmail == normalizedEmail, ct))
            return Problem(statusCode: 409, title: "Email đã được đăng ký.");

        var user = new AppUser
        {
            Email = request.Email, NormalizedEmail = normalizedEmail, CreatedAt = DateTime.UtcNow
        };
        user.PasswordHash = hasher.HashPassword(user, request.Password);
        db.Users.Add(user);
        try
        {
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException error) when (error.InnerException is SqliteException { SqliteErrorCode: 19, SqliteExtendedErrorCode: 2067 })
        {
            // The unique index also protects concurrent registrations of the same email.
            return Problem(statusCode: 409, title: "Email đã được đăng ký.");
        }
        await StartSession(user, ct);
        return CreatedAtAction(nameof(Me), UserResponse.From(user));
    }

    [HttpPost("login"), EnableRateLimiting("auth")]
    public async Task<ActionResult<UserResponse>> Login(LoginRequest request, CancellationToken ct)
    {
        var email = request.Email.ToUpperInvariant();
        var user = await db.Users.SingleOrDefaultAsync(user => user.NormalizedEmail == email, ct);
        var verification = hasher.VerifyHashedPassword(user ?? new AppUser(),
            user?.PasswordHash ?? dummyHash.Value, request.Password);
        if (user is null || verification == PasswordVerificationResult.Failed)
            return Problem(statusCode: 401, title: "Email hoặc mật khẩu không đúng.");

        if (verification == PasswordVerificationResult.SuccessRehashNeeded)
            user.PasswordHash = hasher.HashPassword(user, request.Password);
        await StartSession(user, ct);
        return Ok(UserResponse.From(user));
    }

    [HttpGet("me"), Authorize]
    public async Task<ActionResult<UserResponse>> Me(CancellationToken ct)
    {
        var id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var user = await db.Users.AsNoTracking().SingleOrDefaultAsync(user => user.Id == id, ct);
        return user is null ? Unauthorized() : Ok(UserResponse.From(user));
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout(CancellationToken ct)
    {
        // Idempotent: an expired/missing session can still be signed out.
        var sessionId = User.FindFirstValue("session_id");
        if (sessionId is not null)
            await db.AuthSessions.Where(session => session.Id == sessionId).ExecuteDeleteAsync(ct);
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return NoContent();
    }

    private async Task StartSession(AppUser user, CancellationToken ct)
    {
        var now = DateTime.UtcNow;
        var previousSessionId = User.FindFirstValue("session_id");
        await db.AuthSessions.Where(session => session.ExpiresAt <= now || session.Id == previousSessionId)
            .ExecuteDeleteAsync(ct);
        var session = new AuthSession { Id = Guid.NewGuid().ToString("N"), UserId = user.Id, ExpiresAt = now.AddHours(8) };
        db.AuthSessions.Add(session);
        await db.SaveChangesAsync(ct);

        var identity = new ClaimsIdentity([
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Email),
            new Claim("session_id", session.Id)
        ], CookieAuthenticationDefaults.AuthenticationScheme);
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(identity), new AuthenticationProperties
            {
                IsPersistent = true, ExpiresUtc = new DateTimeOffset(session.ExpiresAt), AllowRefresh = false
            });
    }
}
