using GraphQLTasks.Data;
using GraphQLTasks.Models;
using Task = GraphQLTasks.Models.Task;

namespace GraphQLTasks.GraphQL;

// ReSharper disable once ClassNeverInstantiated.Global
// Disabled since setting to abstract breaks the query
public class Mutation {
    public async Task<Task> AddTask(string name, Status status, [Service] ApplicationDbContext context) {
        var task = new Task {
            Id = Guid.NewGuid(),
            Name = name,
            Status = status
        };

        context.Tasks.Add(task);
        await context.SaveChangesAsync();

        return task;
    }
}