using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using WebBlog.Api.Data;

namespace WebBlog.Api.Auth;

public class SessionCookieEvents(BlogDbContext db) : CookieAuthenticationEvents
{
    public override async Task ValidatePrincipal(CookieValidatePrincipalContext context)
    {
        var sessionId = context.Principal?.FindFirstValue("session_id");
        var parsed = int.TryParse(context.Principal?.FindFirstValue(ClaimTypes.NameIdentifier), out var userId);
        var now = DateTime.UtcNow;
        var valid = parsed && sessionId is not null && await db.AuthSessions.AsNoTracking()
            .AnyAsync(session => session.Id == sessionId && session.UserId == userId && session.ExpiresAt > now,
                context.HttpContext.RequestAborted);
        if (!valid)
        {
            context.RejectPrincipal();
            await context.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }

    public override Task RedirectToLogin(RedirectContext<CookieAuthenticationOptions> context)
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    }

    public override Task RedirectToAccessDenied(RedirectContext<CookieAuthenticationOptions> context)
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    }
}
