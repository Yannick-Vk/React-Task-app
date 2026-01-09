using GraphQLTasks.Data;
using Task = GraphQLTasks.Models.Task;

namespace GraphQLTasks.GraphQL;

public class Query {
    public IQueryable<Task> GetTasks([Service] ApplicationDbContext context) {
        return context.Tasks;
    }
}