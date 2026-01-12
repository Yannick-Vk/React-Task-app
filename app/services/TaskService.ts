import {GetTasksDocument, type GetTasksQuery, Status, type Task} from "~/GraphQL/generated";
import {z, ZodError} from "zod";
import {client} from "~/lib/apollo";

const TaskSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1, "Task name cannot be empty"),
    status: z.enum(Status),
});

// A result type either has the updated list of taks or an error
type AddTaskResult = { success: true; data: Task[] } | { success: false; error: ZodError };

// Add a new task to the list, returns the list or null when the new task was invalid
export const addNewTask = (tasks: Task[], taskName?: string, status?: Status): AddTaskResult => {

    const maxId = tasks.length ? Math.max(...tasks.map(p => p.id)) : 0;
    const newTaskDraft = {
        id: maxId + 1,
        name: taskName?.toString().trim(),
        status: status ?? Status.Ready,
    };

    const result = TaskSchema.safeParse(newTaskDraft);

    if (!result.success) {
        return {success: false, error: result.error};
    }

    return {success: true, data: [...tasks, result.data]};
}

// Remove a task by its id
export const removeTask = (tasks: Task[], id: number): Task[] => {
    return tasks.filter((task) => task.id !== id);
}

// Change a given task's status
export const changeStatus = (tasks: Task[], id: number, status: string): Task[] => {
    return tasks.map(task => {
        if (task.id === id) {
            return {...task, status: status as Status};
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
