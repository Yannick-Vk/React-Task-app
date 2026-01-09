using GraphQLTasks.Data;
using Microsoft.EntityFrameworkCore;
using Task = GraphQLTasks.Models.Task;

namespace GraphQLTasks.GraphQL;

// ReSharper disable once ClassNeverInstantiated.Global
public class Query {
    public Query(IDbContextFactory<ApplicationDbContext> contextFactory) {
        _contextFactory = contextFactory;
    }

    private IDbContextFactory<ApplicationDbContext> _contextFactory { get; }

    public IQueryable<Task> GetTasks() {
        return _contextFactory.CreateDbContext().Tasks;
    }
}