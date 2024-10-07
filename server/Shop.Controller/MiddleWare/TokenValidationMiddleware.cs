using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Shop.Service.AuthenticationService;

namespace Shop.Controller.MiddleWare
{
    public class TokenValidationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IJwtManagement _jwtService;

        public TokenValidationMiddleware(RequestDelegate next, IJwtManagement jwtService)
        {
            _next = next;
            _jwtService = jwtService;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();

            if (authHeader != null && authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                var token = authHeader.Substring("Bearer ".Length).Trim();

                try
                {
                    // Validate the token using your IJwtManagement service
                    if (!_jwtService.ValidateToken(token))
                    {
                        // Respond with a 401 Unauthorized status if token is invalid
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsync("Invalid token.");
                        return;
                    }
                }
                catch (Exception ex)
                {
                    // Respond with a 401 Unauthorized status if any exception occurs during validation
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync($"Token validation failed: {ex.Message}");
                    return;
                }
            }
            else if (authHeader == null)
            {
                // You can choose to ignore or reject requests without Authorization header
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Authorization header missing.");
                return;
            }

            // Call the next middleware in the pipeline
            await _next(context);
        }
    }
}
