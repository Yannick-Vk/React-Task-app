import {type Task, TaskType} from "~/types/Task";
import {z, ZodError} from "zod";

const TaskSchema = z.object({
    id: z.number().int().positive(),
    title: z.string().min(1, "Task name cannot be empty"),
    status: z.enum(TaskType),
});

export const initialTasks: Task[] = [
    {id: 1, title: "Feed the cats", status: TaskType.READY},
    {id: 2, title: "Do the dishes", status: TaskType.COMPLETED},
    {id: 3, title: "Do Homework", status: TaskType.IN_PROGRESS},
];

// A result type either has the updated list of taks or an error
type AddTaskResult = { success: true; data: Task[] } | { success: false; error: ZodError };

// Add a new task to the list, returns the list or null when the new task was invalid
export const addNewTask = (tasks: Task[], taskName?: string, status?: TaskType): AddTaskResult => {

    const maxId = tasks.length ? Math.max(...tasks.map(p => p.id)) : 0;
    const newTaskDraft = {
        id: maxId + 1,
        title: taskName?.toString().trim(),
        status: status ?? TaskType.READY,
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
            return {...task, status: status as TaskType};
        }
        return task;
    })
}
