using System.Text;
using Shop.Infrastrcture.Repositories.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Shop.Controller.MiddleWare;
using Shop.Infrastrcture.Database;
using Shop.Infrastructure.Repositories.Users;
using Shop.Service.AuthenticationService;
using Shop.Service.Repositories.Users;
using Shop.Service.UserManagement;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ShopDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserManagement, UserManagement>();
builder.Services.AddTransient<IJwtManagement, JwtManagement>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JwtConfiguration:Issuer"],
            ValidAudience = builder.Configuration["JwtConfiguration:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtConfiguration:Secret"]))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOrUserIdPolicy", policy =>
        policy.RequireAssertion(context => IsAdminOrMatchingUserId(context))
    );

    options.AddPolicy("UserIdPolicy", policy =>
        policy.RequireAssertion(context => IsMatchingUserId(context))
    );
});

bool IsAdminOrMatchingUserId(AuthorizationHandlerContext context)
{
    var roleClaim = context.User.Claims.FirstOrDefault(c =>
        c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value;

    var userIdClaim = context.User.Claims.FirstOrDefault(c =>
        c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

    var routeUserId = GetRouteUserId(context);

    return roleClaim == "Admin" || userIdClaim == routeUserId;
}
bool IsMatchingUserId(AuthorizationHandlerContext context)
{
    var userIdClaim = context.User.Claims.FirstOrDefault(c =>
        c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

    var routeUserId = GetRouteUserId(context);

    return userIdClaim is not null && routeUserId is not null && userIdClaim == routeUserId;
}
string GetRouteUserId(AuthorizationHandlerContext context)
{
    return context.Resource is HttpContext httpContext
        ? httpContext?.Request.RouteValues["userId"]?.ToString()
        : null;
}

builder.Services.AddControllers(options =>
{

}).ConfigureApiBehaviorOptions(options =>
{
    options.SuppressModelStateInvalidFilter = false;
}).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Please enter a valid token"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
// app.UseDeveloperExceptionPage();
app.UseMiddleware<TokenValidationMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.Run();
