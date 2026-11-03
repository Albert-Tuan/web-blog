using System.ComponentModel.DataAnnotations;

namespace WebBlog.Api.Contracts;

public class LoginRequest
{
    private string email = "";

    [Required(ErrorMessage = "Vui lòng nhập email."), EmailAddress(ErrorMessage = "Email không hợp lệ."), StringLength(254)]
    public string Email { get => email; set => email = value?.Trim() ?? ""; }

    [Required(ErrorMessage = "Vui lòng nhập mật khẩu."), StringLength(128)]
    public string Password { get; set; } = "";
}

public class RegisterRequest : LoginRequest, IValidatableObject
{
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        // Never trim passwords. Spaces are meaningful password characters.
        if (Password is not null && Password.Length < 12)
            yield return new ValidationResult("Mật khẩu phải có ít nhất 12 ký tự.", [nameof(Password)]);
    }
}
