using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using WebBlog.Api.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddProblemDetails();

// Resolve relative SQLite paths against the API directory, including when EF CLI runs.
var connection = new SqliteConnectionStringBuilder(
    builder.Configuration.GetConnectionString("BlogDatabase")
    ?? throw new InvalidOperationException("Missing ConnectionStrings:BlogDatabase."));
if (connection.DataSource != ":memory:" && !Path.IsPathRooted(connection.DataSource))
    connection.DataSource = Path.Combine(builder.Environment.ContentRootPath, connection.DataSource);
builder.Services.AddDbContext<BlogDbContext>(options => options.UseSqlite(connection.ToString()));

var origins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options => options.AddPolicy("Frontend", policy =>
    policy.WithOrigins(origins).WithMethods("GET", "POST", "PUT", "DELETE").AllowAnyHeader()));

var app = builder.Build();
app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseCors("Frontend");
app.MapControllers();
app.Run();

public partial class Program { }
