using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using WebBlog.Api.Auth;
using WebBlog.Api.Data;
using WebBlog.Api.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers(options => options.Filters.Add<ValidateCsrfFilter>());
builder.Services.AddProblemDetails();
builder.Services.AddScoped<IPasswordHasher<AppUser>, PasswordHasher<AppUser>>();
builder.Services.AddSingleton<DummyPasswordHash>();
builder.Services.AddScoped<SessionCookieEvents>();
var cookieSecurity = builder.Environment.IsDevelopment() ? CookieSecurePolicy.SameAsRequest : CookieSecurePolicy.Always;
builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "X-CSRF-TOKEN";
    options.Cookie.Name = "WebBlog.Csrf";
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.Cookie.SecurePolicy = cookieSecurity;
});
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
{
    options.Cookie.Name = "WebBlog.Auth";
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.Cookie.SecurePolicy = cookieSecurity;
    options.ExpireTimeSpan = TimeSpan.FromHours(8);
    options.SlidingExpiration = false;
    options.EventsType = typeof(SessionCookieEvents);
});
builder.Services.AddAuthorization();
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy("auth", context => RateLimitPartition.GetFixedWindowLimiter(
        context.Connection.RemoteIpAddress?.ToString() ?? "unknown", _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = builder.Configuration.GetValue("Auth:RequestsPerMinute", 30),
            Window = TimeSpan.FromMinutes(1), QueueLimit = 0
        }));
});

// Resolve relative SQLite paths against the API directory, including when EF CLI runs.
var connection = new SqliteConnectionStringBuilder(
    builder.Configuration.GetConnectionString("BlogDatabase")
    ?? throw new InvalidOperationException("Missing ConnectionStrings:BlogDatabase."));
if (connection.DataSource != ":memory:" && !Path.IsPathRooted(connection.DataSource))
    connection.DataSource = Path.Combine(builder.Environment.ContentRootPath, connection.DataSource);
builder.Services.AddDbContext<BlogDbContext>(options => options.UseSqlite(connection.ToString()));

var origins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options => options.AddPolicy("Frontend", policy =>
    policy.WithOrigins(origins).WithMethods("GET", "POST", "PUT", "DELETE").AllowAnyHeader().AllowCredentials()));

var app = builder.Build();
app.UseExceptionHandler();
app.UseStatusCodePages();
if (!app.Environment.IsDevelopment()) app.UseHttpsRedirection();
app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();
app.MapControllers();
app.Run();

public partial class Program { }
