namespace GraphQLTasks.Types;

[QueryType]
public static class Query {
    public static Task GetTask()
        => new Task("Feed my cats!", Status.Done);

    public static List<Task> GetTasks() => [
        new Task("Feed my cats!", Status.Done), 
        new Task("Do homework!", Status.InProgress), 
        new Task("Try to behave!", Status.UnderReview), 
    ];
}