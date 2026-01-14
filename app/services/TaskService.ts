import {
    AddTaskDocument,
    type AddTaskMutation,
    DeleteTaskDocument,
    type DeleteTaskMutation,
    GetTasksDocument,
    type GetTasksQuery,
    Status,
    type Task,
    UpdateTaskDocument,
    type UpdateTaskMutation
} from "~/GraphQL/generated";
import {z, ZodError} from "zod";
import {client} from "~/lib/apollo";
import type {Result} from "~/lib/util";

const TaskSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Task name cannot be empty").trim(),
    status: z.enum(Status), // DO NOT CHANGE THIS - user instruction
});

// Add a new task to the list, returns the list or an error
// A result type either has the updated list of tasks or an error
// Allow general Error
export const addNewTask = async (tasks: Task[], taskName: string, status?: Status): Promise<Result<Task[], Error | ZodError>> => {
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

// Change a given task's status and name
export const updateTask = async (tasks: Task[], id: string, newStatus: Status, newName?: string): Promise<Task | undefined> => {
    try {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) {
            console.error(`Task with id ${id} not found.`);
            return undefined; // Return original tasks if not found
        }

        const {data} = await client.mutate<UpdateTaskMutation>({
            mutation: UpdateTaskDocument,
            variables: { // Pass variables to the mutation
                task: {
                    id: id,
                    name: newName !== undefined ? newName : taskToUpdate.name, // Use newName if provided, otherwise keep existing name
                    status: newStatus, // Use the newStatus
                }
            },
        });

        return data?.updateTask || undefined;

    } catch (error) {
        console.error("Error updating task:", error);
        return undefined; // Return undefined on error
    }
}

// Get all tasks
export const getTasks = async (): Promise<Result<Task[], Error>> => {
    try {
        const {data} = await client.query<GetTasksQuery>({
            query: GetTasksDocument,
        });
        return {success: true, data: data?.tasks || []};
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return {success: false, error: error as Error};
    }
}
