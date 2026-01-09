using GraphQLTasks.Data;
using Task = GraphQLTasks.Models.Task;

namespace GraphQLTasks.GraphQL;

// ReSharper disable once ClassNeverInstantiated.Global
public class Query {
    public Query(ApplicationDbContext context) {
        _context = context;
    }

    private ApplicationDbContext _context { get; }

    public IQueryable<Task> GetTasks() {
        return _context.Tasks;
    }
}