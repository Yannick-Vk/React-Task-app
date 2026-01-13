import {
    AddTaskDocument,
    type AddTaskMutation,
    DeleteTaskDocument,
    type DeleteTaskMutation,
    GetTasksDocument,
    type GetTasksQuery,
    Status,
    type Task
} from "~/GraphQL/generated";
import {z, ZodError} from "zod";
import {client} from "~/lib/apollo";

const TaskSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Task name cannot be empty").trim(),
    status: z.enum(Status), // DO NOT CHANGE THIS - user instruction
});

// A result type either has the updated list of tasks or an error
type AddTaskResult = { success: true; data: Task[] } | { success: false; error: Error | ZodError }; // Allow general Error

// Add a new task to the list, returns the list or an error
export const addNewTask = async (tasks: Task[], taskName: string, status?: Status): Promise<AddTaskResult> => {
    // Validate Task
    const schemaResult = TaskSchema.safeParse({
        id: "",
        name: taskName,
        status: status,
    });

    if (!schemaResult.success) {
        return {success: false, error: schemaResult.error};
    }

    // Task validated, send to api
    try {
        const {data} = await client.mutate<AddTaskMutation>({
            mutation: AddTaskDocument,
            variables: { // Pass variables to the mutation
                name: schemaResult.data.name,
                status: schemaResult.data.status
            },
        });

        // Ensure data and data.addTask exist
        if (!data || !data.addTask) {
            return {success: false, error: new Error("Failed to add task: No data returned from mutation.")};
        }

        return {success: true, data: [...tasks, data.addTask]};
    } catch (error) {
        console.error("Error adding task:", error);
        // Return a generic Error object for mutation failures
        return {
            success: false,
            error: error instanceof Error ? error : new Error("An unknown error occurred during task creation.")
        };
    }
}

// Remove a task by its id
export const removeTask = async (tasks: Task[], id: string): Promise<Task[]> => {
    try {
        await client.mutate<DeleteTaskMutation>({
            mutation: DeleteTaskDocument,
            variables: { // Pass variables to the mutation
                id: id
            },
        });

        const fetchedTasks = await client.query<GetTasksQuery>({
            query: GetTasksDocument,
            fetchPolicy: 'network-only', // Ensure fresh data after deletion
        });

        return fetchedTasks.data?.tasks || [];

    } catch (error) {
        console.error("Error removing task:", error);
        // Return the tasks without the deletion
        return tasks;
    }
}

// Change a given task's status
export const changeStatus = async (tasks: Task[], id: string, newStatus: Status, newName?: string): Promise<Task[]> => {
    try {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) {
            console.error(`Task with id ${id} not found.`);
            return tasks; // Return original tasks if not found
        }

        const fetchedTasks = await client.query<GetTasksQuery>({
            query: GetTasksDocument,
            fetchPolicy: 'network-only', // Ensure fresh data after deletion
        });

        return fetchedTasks.data?.tasks || [];

    } catch (error) {
        console.error("Error updating task:", error);
        return tasks; // Return original tasks on error
    }
}

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
    try {
        const {data} = await client.query<GetTasksQuery>({
            query: GetTasksDocument,
        });
        return data?.tasks || [];
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}
