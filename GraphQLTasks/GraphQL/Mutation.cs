using GraphQLTasks.Data;
using GraphQLTasks.Models;
using Microsoft.EntityFrameworkCore;
using Task = GraphQLTasks.Models.Task;

namespace GraphQLTasks.GraphQL;

// ReSharper disable once ClassNeverInstantiated.Global
// Disabled since setting to abstract breaks the query
public class Mutation {
    public Mutation(IDbContextFactory<ApplicationDbContext> contextFactory) {
        _contextFactory = contextFactory;
    }

    private IDbContextFactory<ApplicationDbContext> _contextFactory { get; }

    public async Task<Task> AddTask(string name, Status status) {
        await using var context = await _contextFactory.CreateDbContextAsync();
        var task = new Task {
            Id = Guid.NewGuid(),
            Name = name,
            Status = status,
        };

        context.Tasks.Add(task);
        await context.SaveChangesAsync();

        return task;
    }

    public async Task<Task?> RemoveTask(Guid id) {
        await using var context = await _contextFactory.CreateDbContextAsync();
        var task = await context.Tasks.FindAsync(id);
        if (task is null) {
            return null;
        }

        context.Remove(task);
        await context.SaveChangesAsync();

        return task;
    }

    public async Task<Task?> UpdateTask(Task updatedTask) {
        await using var context = await _contextFactory.CreateDbContextAsync();
        var task = await context.Tasks.FindAsync(updatedTask.Id);
        if (task is null) return null;

        context.Update(updatedTask);
        await context.SaveChangesAsync();
        return task;
    }
}