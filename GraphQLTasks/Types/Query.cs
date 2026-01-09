namespace GraphQLTasks.Types;

[QueryType]
public static class Query {
    public static Task GetTask() => new("Feed my cats!", Status.Done);

    public static List<Task> GetTasks() => [
        new("Prepare food"),
        new("Feed my cats!", Status.Done), 
        new("Do homework!", Status.InProgress), 
        new("Try to behave!", Status.UnderReview), 
    ];
}