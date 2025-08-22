using System;
using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware;

public class ExceptionMiddleWare(RequestDelegate next, ILogger<ExceptionMiddleWare> logger, IHostEnvironment env)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context); // Call the next middleware in the pipeline
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred: {Message}", ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var response = env.IsDevelopment()
                ? new ApiExceptions(StatusCodes.Status500InternalServerError, ex.Message, ex.StackTrace)
                : new ApiExceptions(StatusCodes.Status500InternalServerError, "An unexpected error occurred");
            // ? is called ternary operator
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };
            var json = JsonSerializer.Serialize(response, options);
            // var response = new ApiExceptions(StatusCodes.Status500InternalServerError, "An unexpected error occurred", env.IsDevelopment() ? ex.StackTrace : null);
            await context.Response.WriteAsync(json);
        }
    }
}

