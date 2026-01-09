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
            Status = status,
        };

        context.Tasks.Add(task);
        await context.SaveChangesAsync();

        return task;
    }

    public async Task<Task?> RemoveTask(Guid id, [Service] ApplicationDbContext context) {
        var task = await context.Tasks.FindAsync(id);
        if (task == null) {
            return null;
        }

        context.Remove(task);
        await context.SaveChangesAsync();

        return task;
    }
}