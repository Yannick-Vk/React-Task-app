using System.ComponentModel.DataAnnotations;

namespace GraphQLTasks.Models;

public class Task {
    public Guid Id { get; set; }

    [StringLength(255)] public required string Name { get; set; }

    public Status Status { get; set; } = Status.Ready;
}

public enum Status {
    Ready,
    InProgress,
    Done,
}