namespace GraphQLTasks.Models;

public class Task {
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public Status Status { get; set; } = Status.Ready;
}

public enum Status {
    Ready,
    InProgress,
    Done,
}