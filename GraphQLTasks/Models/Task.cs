using System.ComponentModel.DataAnnotations;

namespace GraphQLTasks.Models;

public class Task {
    public Guid Id { get; set; }
    [StringLength(255)] public required string Name { get; set; }
    [StringLength(512)] public string? Description { get; set; }
    public Status Status { get; set; } = Status.Ready;
    public Priority Priority { get; set; } = Priority.None;
    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime? Updated { get; set; }
    public DateTime? DueDate { get; set; }

    public void Update(UpdateTaskDto updatedTask) {
        Name = updatedTask.Name ?? Name;
        Status = updatedTask.Status ?? Status;
        Description = updatedTask.Description ?? Description;
        Priority = updatedTask.Priority ?? Priority;
        DueDate = updatedTask.DueDate ?? DueDate;

        if (updatedTask.Name is not null || updatedTask.Status is not null || updatedTask.Description is not null ||
            updatedTask.Priority is not null || updatedTask.DueDate is not null) {
            Updated = DateTime.Now;
        }
    }
}