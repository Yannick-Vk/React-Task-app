import {
    AddTaskDocument,
    type AddTaskMutation,
    GetTasksDocument,
    type GetTasksQuery,
    Status,
    type Task
} from "~/GraphQL/generated";
import {z, ZodError} from "zod";
import {client} from "~/lib/apollo";

const TaskSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Task name cannot be empty"),
    status: z.enum(Status), // DO NOT CHANGE THIS - user instruction
});

// A result type either has the updated list of tasks or an error
type AddTaskResult = { success: true; data: Task[] } | { success: false; error: Error | ZodError }; // Allow general Error

// Add a new task to the list, returns the list or an error
export const addNewTask = async (tasks: Task[], taskName: string, status?: Status): Promise<AddTaskResult> => {
    // Basic validation for taskName since it's required by GraphQL and Zod schema
    const nameSchema = z.string().min(1, "Task name cannot be empty");
    const nameValidationResult = nameSchema.safeParse(taskName.trim());

    if (!nameValidationResult.success) {
        return {success: false, error: nameValidationResult.error};
    }

    const trimmedTaskName = nameValidationResult.data; // Use the validated and trimmed name

    try {
        const {data} = await client.mutate<AddTaskMutation>({
            mutation: AddTaskDocument,
            variables: { // Pass variables to the mutation
                name: trimmedTaskName,
                status: status ?? Status.Ready, // Default to Ready if not provided
            },
        });

        // Ensure data and data.addTask exist
        if (!data || !data.addTask) {
            return {success: false, error: new Error("Failed to add task: No data returned from mutation.")};
        }

        // Validate the received task from GraphQL against TaskSchema
        const validatedNewTask = TaskSchema.safeParse(data.addTask);
        if (!validatedNewTask.success) {
            // This would indicate a mismatch between frontend schema and backend response
            console.error("Received task from backend failed Zod validation:", validatedNewTask.error);
            return {success: false, error: validatedNewTask.error};
        }

        return {success: true, data: [...tasks, validatedNewTask.data]};
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
export const removeTask = (tasks: Task[], id: string): Task[] => {
    return tasks.filter((task) => task.id !== id);
}

// Change a given task's status
export const changeStatus = (tasks: Task[], id: string, status: Status): Task[] => {
    return tasks.map(task => {
        if (task.id === id) {
            return {...task, status: status};
        }
        return task;
    })
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
