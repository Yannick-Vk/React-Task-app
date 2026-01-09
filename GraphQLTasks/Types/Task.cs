namespace GraphQLTasks.Types;

public class Task {
   public Guid Id { get; init; }
   public string Name { get; private set; }
   public Status Status { get; private set; }

   public Task(string name, Status status = Status.Ready) {
      Id = Guid.NewGuid();
      Name = name;
      Status = status;
   }
}