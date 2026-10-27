using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebBlog.Api.Filters;

// This learning project has no authentication. Keep writes local to Development.
[AttributeUsage(AttributeTargets.Method)]
public sealed class DevelopmentWriteAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.HttpContext.RequestServices.GetRequiredService<IHostEnvironment>().IsDevelopment())
            context.Result = new ObjectResult(new ProblemDetails
            {
                Status = StatusCodes.Status403Forbidden,
                Title = "Demo writes are enabled only in Development."
            }) { StatusCode = StatusCodes.Status403Forbidden };
    }
}
