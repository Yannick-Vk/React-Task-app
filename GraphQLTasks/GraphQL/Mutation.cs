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

    public async Task<Task> AddTask(string name, Status? status, Priority? priority, string? description,
        DateTime? dueDate) {
        await using var context = await _contextFactory.CreateDbContextAsync();
        var task = new Task {
            Id = Guid.NewGuid(),
            Name = name,
            Status = status ?? Status.Ready,
            Description = description,
            DueDate = dueDate?.ToUniversalTime(),
            Priority = priority ?? default,
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

    public async Task<Task?> UpdateTask(UpdateTaskDto updatedTask) {
        await using var context = await _contextFactory.CreateDbContextAsync();
        var task = await context.Tasks.FindAsync(updatedTask.Id);
        if (task is null) return null;

        if (updatedTask.DueDate.HasValue) {
            updatedTask.DueDate = updatedTask.DueDate.Value.ToUniversalTime();
        }

        task.Update(updatedTask);

        await context.SaveChangesAsync();
        return task;
    }
}