namespace GraphQLTasks.Models;

public class UpdateTaskDto {
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public Status? Status { get; set; }
}