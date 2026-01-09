using GraphQLTasks.Data;
using GraphQLTasks.Models;
using Task = GraphQLTasks.Models.Task;

namespace GraphQLTasks.GraphQL;

// ReSharper disable once ClassNeverInstantiated.Global
// Disabled since setting to abstract breaks the query
public class Mutation {
    public Mutation(ApplicationDbContext context) {
        _context = context;
    }

    private ApplicationDbContext _context { get; }

    public async Task<Task> AddTask(string name, Status status) {
        var task = new Task {
            Id = Guid.NewGuid(),
            Name = name,
            Status = status,
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return task;
    }

    public async Task<Task?> RemoveTask(Guid id) {
        return null;
    }
}