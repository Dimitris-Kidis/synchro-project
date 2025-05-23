using Synchro.ExceptionFilter;
using Synchro.Hub;
using Synchro.Identity;
using Synchro.Infrastructure.Configurations;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

AuthOptions.Configure(configuration);

builder.Services
    .AddDbContext(builder)
    .AddRepositories()
    .AddServices()
    .AddProviders()
    .AddSwaggerServices()
    .AddMapper()
    .AddCorsPolicy()
    .AddMediatRConfigs()
    .AddTelegramClient(builder)
    .AddControllers(option => option.Filters.Add(typeof(ApiExceptionFilter)))
    .AddValidators();

builder.Services.AddIdentityConfiguration();
builder.Services.AddJwtAuthentication();

builder.Services.AddSignalR();

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => options.InjectStylesheet("/swagger-ui/custom.css"));
}

app.UseCors("AllowAllOrigins");

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseErrorHandlingMiddleware();
app.UseDbTransactionMiddleware();

app.MapHub<ChatHub>("/chatHub");
app.MapControllers();

await app.RunAsync();