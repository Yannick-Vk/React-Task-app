import {useEffect, useState} from "react";
import {type Task} from "~/GraphQL/generated";
import {addNewTask, getTasks, removeTask, updateTask} from "~/services/TaskService";
import {Err, None, Ok, type Option, type Result, Some} from "~/lib/util";
import {ZodError} from "zod";
import {type AddTaskDTO, statusUpdateToFullDTO, type UpdateStatusDTO, type UpdateTaskDTO} from "~/dto/taskDTOs";
import {DateTime} from "luxon";

export function useTaskManager() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const sortTasks = (tasksToSort: Task[]): Task[] => {
        return [...tasksToSort].sort((a, b) => {
            const dateA = DateTime.fromISO(a.created);
            const dateB = DateTime.fromISO(b.created);
            if (dateA.toMillis() !== dateB.toMillis()) {
                return dateA.toMillis() - dateB.toMillis();
            }
            return a.id.localeCompare(b.id); // Stable sort for identical creation dates
        });
    }

    useEffect(() => {
        let isMounted = true;

        const fetchTasks = async () => {
            try {
                setLoading(true);
                const result = await getTasks();

                if (isMounted) {
                    result.match(
                        (tasks) => setTasks(sortTasks(tasks)),
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
        const taskToUpdate = tasks.find(task => task.id === updatedTask.id);
        if (!taskToUpdate) {
            const message = `Task with id ${updatedTask.id} not found.`;
            console.error(message);
            setError(message);
            return;
        }

        const fullUpdateDto: UpdateTaskDTO = statusUpdateToFullDTO(updatedTask);
        const originalTask = taskToUpdate;

        setTasks(prevTasks => prevTasks.map(task =>
            task.id === updatedTask.id ? {...task, status: updatedTask.status} : task
        ));

        const result = await updateTaskHandler(fullUpdateDto);

        result.match(
            (updatedTask) => {
                // Successfully updated, ensure state is in sync
                setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task))
            },
            (error) => {
                // Revert optimistic update on failure
                console.error("Failed to update task status: ", error);
                setTasks(prevTasks => prevTasks.map(task =>
                    task.id === originalTask.id ? originalTask : task
                ));
                setError(error.message);
            }
        );
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
