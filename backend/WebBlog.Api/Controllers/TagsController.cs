using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebBlog.Api.Data;

namespace WebBlog.Api.Controllers;

[ApiController]
[Route("api/tags")]
public class TagsController(BlogDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var posts = await db.Posts.AsNoTracking().Select(p => p.Tags).ToListAsync(cancellationToken);
        var tags = posts.SelectMany(tags => tags.Distinct(StringComparer.OrdinalIgnoreCase))
            .GroupBy(tag => tag, StringComparer.OrdinalIgnoreCase)
            .Select(group => new { Name = group.Key, Count = group.Count() })
            .OrderByDescending(tag => tag.Count).ThenBy(tag => tag.Name);
        return Ok(tags);
    }
}
