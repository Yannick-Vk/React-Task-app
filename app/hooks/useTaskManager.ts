import {useEffect, useState} from "react";
import {type Task} from "~/GraphQL/generated";
import {addNewTask, getTasks, removeTask, updateTask} from "~/services/TaskService";
import {Err, None, Ok, type Option, type Result, Some} from "~/lib/util";
import {ZodError} from "zod";
import {type AddTaskDTO, statusUpdateToFullDTO, type UpdateStatusDTO, type UpdateTaskDTO} from "~/dto/taskDTOs";

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
                    result.match(
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

    const addTask = async (dto: AddTaskDTO): Promise<Option<ZodError | Error>> => {
        const result = await addNewTask(tasks, dto);

        return result.match(
            (newTasks) => {
                setTasks(newTasks);
                return None();
            },
            (error): Option<ZodError | Error> => {
                return Some(error);
            }
        );
    }

    const removeTaskHandler = async (id: string): Promise<Result<string, Error>> => {
        const result = await removeTask(id);

        result.match(
            (id) => setTasks(prevState => prevState.filter((task) => task.id !== id)),
            (err) => setError(err.message),
        );

        return result;
    }

    const changeStatusHandler = async (updatedTask: UpdateStatusDTO) => {
        const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
        if (taskIndex === -1) {
            console.error(`Task with id ${updatedTask.id} not found.`);
            return;
        }
        const originalTask = tasks[taskIndex];

        const optimisticTasks = tasks.map(task =>
            task.id === updatedTask.id ? {...task, status: updatedTask.status} : task
        );
        setTasks(optimisticTasks);

        try {
            (await updateTask(statusUpdateToFullDTO(updatedTask))).match(
                (updatedTask) => setTasks(prevTasks =>
                    prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
                ),
                (error) => { // Revert changes
                    console.error("Failed to update task status:", error)
                    setTasks(prevTasks =>
                        prevTasks.map(task => (task.id === updatedTask.id ? originalTask : task))
                    );
                }
            );
        } catch (error) {
            console.error("Failed to update task status:", error);
            setTasks(prevTasks =>
                prevTasks.map(task => (task.id === updatedTask.id ? originalTask : task))
            );
        }
    }

    const updateTaskHandler = async (task: UpdateTaskDTO): Promise<Result<Task, Error>> => {
        return (await updateTask(task)).match(
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
