namespace GraphQLTasks.Models;

public class UpdateTaskDto {
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public Status? Status { get; set; }
    public Priority? Priority { get; set; }
    public DateTime? DueDate { get; set; }
    public string? Description { get; set; }
}