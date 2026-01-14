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
import {Err, Ok, type Result, strToErr, toErr} from "~/lib/util";

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
        return Err(schemaResult.error);
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
        return (!data || !data.addTask) ?
            strToErr("Failed to add task: No data returned from mutation.")
            : Ok([...tasks, data.addTask]);

    } catch (error) {
        console.error("Error adding task:", error);
        // Return a generic Error object for mutation failures
        return toErr(error);
    }
}

// Remove a task by its id
export const removeTask = async (id: string): Promise<Result<string, Error>> => {
    try {
        await client.mutate<DeleteTaskMutation>({
            mutation: DeleteTaskDocument,
            variables: { // Pass variables to the mutation
                id: id
            },
        });

        return Ok(id); // Return the ID of the successfully deleted task

    } catch (error) {
        console.error("Error removing task:", error);
        return toErr(error); // Return an Err result on failure
    }
}

// Change a given task's status and name
export const updateTask = async (tasks: Task[], id: string, newStatus: Status, newName: string): Promise<Result<Task, Error>> => {
    try {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) {
            console.error(`Task with id ${id} not found.`);
            return strToErr(`Task with id ${id} not found.`);
        }
        if (newName.trim().length == 0) {
            return strToErr(`The task's new name cannot be empty`);
        }

        const {data} = await client.mutate<UpdateTaskMutation>({
            mutation: UpdateTaskDocument,
            variables: { // Pass variables to the mutation
                task: {
                    id: id,
                    name: newName,
                    status: newStatus
                }
            },
        });

        return data ? Ok(data.updateTask!)
            : strToErr("No data was given.");

    } catch (error) {
        console.error("Error updating task:", error);
        return toErr(error);
    }
}

// Get all tasks
export const getTasks = async (): Promise<Result<Task[], Error>> => {
    try {
        const {data} = await client.query<GetTasksQuery>({
            query: GetTasksDocument,
        });
        return Ok(data?.tasks || []);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return toErr(error);
    }
}
