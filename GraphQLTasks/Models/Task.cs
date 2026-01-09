namespace GraphQLTasks.Models;

public class Task
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public Status Status { get; set; }
}

public enum Status
{
    Ready,
    InProgress,
    Done
}