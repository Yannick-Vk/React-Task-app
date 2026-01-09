namespace GraphQLTasks.Types;

[QueryType]
public static class Query {
    public static Task GetTask()
        => new Task("Feed my cats!", Status.Done);
}