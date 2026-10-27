using System.ComponentModel.DataAnnotations;

namespace WebBlog.Api.Contracts;

// Separate request DTO: clients cannot overwrite Id or PublishedAt.
public class PostRequest : IValidatableObject
{
    [Required, StringLength(200)]
    public string Title { get; set; } = "";
    [Required, StringLength(500)]
    public string Excerpt { get; set; } = "";
    [Required, StringLength(100000)]
    public string Content { get; set; } = "";
    [Required, StringLength(100)]
    public string Author { get; set; } = "";
    [Required, MaxLength(10)]
    public List<string> Tags { get; set; } = [];

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Tags is not null && Tags.Any(tag => string.IsNullOrWhiteSpace(tag) || tag.Trim().Length > 40))
            yield return new ValidationResult("Mỗi tag phải có 1–40 ký tự.", [nameof(Tags)]);
    }
}
