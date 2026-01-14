import {useEffect, useState} from "react";
import {Status, type Task} from "~/GraphQL/generated";
import {addNewTask, getTasks, removeTask, updateTask} from "~/services/TaskService";
import {Err, matchResult, None, Ok, type Option, type Result, Some} from "~/lib/util";
import {ZodError} from "zod";

export function useTaskManager() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchTasks = async () => {
            try {
                setLoading(true);
                const result = await getTasks();

                if (isMounted) {
                    matchResult(result,
                        (tasks) => setTasks(tasks),
                        (err) => setError(err.message),
                    );
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to load tasks.");
                    console.error(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        void fetchTasks();

        return () => {
            isMounted = false;
        }
    }, []);

    const addTask = async (taskName: string, status?: Status): Promise<Option<ZodError>> => {
        const result = await addNewTask(tasks, taskName, status);

        return matchResult(result,
            (newTasks) => {
                setTasks(newTasks);
                return None;
            },
            (error) => {
                return error instanceof ZodError ?
                    Some(error) :
                    Some(new ZodError([{
                        code: "custom",
                        path: ["name"],
                        message: error.message || "An unknown error occurred while adding the task."
                    }]));
            }
        );
    }

    const removeTaskHandler = async (id: string) => {
        const result = await removeTask(id); // Call the service, which now returns Result<string, Error>

        matchResult(result,
            (deletedId) => { // onOk: Filter out the deleted task locally
                setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedId));
            },
            (err) => { // onErr: Set the error state
                console.error("Failed to remove task:", err);
                setError(err.message);
            }
        );
    }

    const changeStatusHandler = async (id: string, newStatusValue: Status) => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            console.error(`Task with id ${id} not found.`);
            return;
        }
        const originalTask = tasks[taskIndex];

        const optimisticTasks = tasks.map(task =>
            task.id === id ? {...task, status: newStatusValue} : task
        );
        setTasks(optimisticTasks);

        try {
            matchResult(await updateTask(tasks, id, newStatusValue, originalTask.name),
                (updatedTask) => setTasks(prevTasks =>
                    prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
                ),
                (error) => { // Revert changes
                    console.error("Failed to update task status:", error)
                    setTasks(prevTasks =>
                        prevTasks.map(task => (task.id === id ? originalTask : task))
                    );
                }
            );
        } catch (error) {
            console.error("Failed to update task status:", error);
            setTasks(prevTasks =>
                prevTasks.map(task => (task.id === id ? originalTask : task))
            );
        }
    }

    const updateTaskHandler = async (task: Task): Promise<Result<Task, Error>> => {
        return matchResult(await updateTask(tasks, task.id, task.status, task.name),
            (updatedTask) => {
                setTasks(prevTasks =>
                    prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
                );
                return Ok(updatedTask);
            },
            (error) => {
                console.error("Failed to update task: ", error);
                return Err(error);
            }
        );
    };

    return {
        tasks,
        loading,
        error,
        addTask,
        removeTaskHandler,
        changeStatusHandler,
        updateTaskHandler
    };
}
