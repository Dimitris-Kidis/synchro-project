﻿using Core.Domain;

namespace Synchro.Infrastructure.Middleware
{
    // REFACTOR
    public class DbTransactionMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext httpContext, SynchroDbContext dbContext)
        {
            if (httpContext.Request.Method == HttpMethod.Get.Method)
            {
                await _next(httpContext);
                return;
            }

            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                await _next(httpContext);
                await dbContext.Database.CommitTransactionAsync();
            }

        }
    }
}
