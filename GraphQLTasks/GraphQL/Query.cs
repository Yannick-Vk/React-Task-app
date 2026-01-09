using GraphQLTasks.Data;
using Task = GraphQLTasks.Models.Task;

namespace GraphQLTasks.GraphQL;

// ReSharper disable once ClassNeverInstantiated.Global
public class Query {
    public IQueryable<Task> GetTasks([Service] ApplicationDbContext context) {
        return context.Tasks;
    }
}