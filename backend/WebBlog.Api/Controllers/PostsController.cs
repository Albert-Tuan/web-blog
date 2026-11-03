using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebBlog.Api.Contracts;
using WebBlog.Api.Data;
using WebBlog.Api.Models;

namespace WebBlog.Api.Controllers;

[ApiController]
[Route("api/posts")]
public class PostsController(BlogDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<PostResponse>>> GetAll(CancellationToken cancellationToken)
    {
        var posts = await db.Posts.AsNoTracking().OrderByDescending(p => p.PublishedAt)
            .ThenByDescending(p => p.Id).ToListAsync(cancellationToken);
        return Ok(posts.Select(PostResponse.From).ToList());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PostResponse>> GetById(int id, CancellationToken cancellationToken)
    {
        var post = await db.Posts.AsNoTracking().SingleOrDefaultAsync(p => p.Id == id, cancellationToken);
        return post is null ? NotFound() : Ok(PostResponse.From(post));
    }

    [HttpPost, Authorize]
    public async Task<ActionResult<PostResponse>> Create(PostRequest request, CancellationToken cancellationToken)
    {
        var post = new Post { PublishedAt = DateTime.UtcNow, AuthorId = CurrentUserId, Author = User.Identity!.Name! };
        Apply(request, post);
        db.Posts.Add(post);
        await db.SaveChangesAsync(cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = post.Id }, PostResponse.From(post));
    }

    [HttpPut("{id:int}"), Authorize]
    public async Task<ActionResult<PostResponse>> Update(int id, PostRequest request, CancellationToken cancellationToken)
    {
        var post = await db.Posts.SingleOrDefaultAsync(p => p.Id == id, cancellationToken);
        if (post is null) return NotFound();
        if (post.AuthorId != CurrentUserId) return Forbid();
        Apply(request, post);
        await db.SaveChangesAsync(cancellationToken);
        return Ok(PostResponse.From(post));
    }

    [HttpDelete("{id:int}"), Authorize]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var post = await db.Posts.SingleOrDefaultAsync(p => p.Id == id, cancellationToken);
        if (post is null) return NotFound();
        if (post.AuthorId != CurrentUserId) return Forbid();
        db.Posts.Remove(post);
        await db.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    private int CurrentUserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    private static void Apply(PostRequest request, Post post)
    {
        post.Title = request.Title.Trim();
        post.Excerpt = request.Excerpt.Trim();
        post.Content = request.Content.Trim();
        post.Tags = request.Tags.Select(t => t.Trim()).Distinct(StringComparer.OrdinalIgnoreCase).ToList();
    }
}
