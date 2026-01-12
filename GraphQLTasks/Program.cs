using GraphQLTasks.Data;
using GraphQLTasks.GraphQL;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddPooledDbContextFactory<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddCors(options => { });

builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddProjections()
    .AddFiltering()
    .AddSorting()
    .RegisterDbContextFactory<ApplicationDbContext>() // Changed from RegisterDbContext
    .ModifyRequestOptions(opt => opt.IncludeExceptionDetails = builder.Environment.IsDevelopment());

var app = builder.Build();

app.UseCors(policyBuilder => {
    policyBuilder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
});

// Automatically apply database migrations on startup
using (var scope = app.Services.CreateScope()) {
    var dbContextFactory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<ApplicationDbContext>>();
    await using (var dbContext = await dbContextFactory.CreateDbContextAsync()) {
        await dbContext.Database.MigrateAsync();
    }
}

app.MapGraphQL();

app.RunWithGraphQLCommands(args);