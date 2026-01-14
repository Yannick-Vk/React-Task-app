import type {Route} from "./+types/home";
import TaskTable from "~/components/tasks/TaskTable";
import CreateTask from "~/components/tasks/CreateTask";
import {useEffect, useState} from "react";
import Modal from "~/components/ui/Modal";
import Button from "~/components/ui/Button"; // Import Button component
import {addNewTask, getTasks, removeTask, updateTask} from "~/services/TaskService";
import {Status, type Task} from "~/GraphQL/generated";
import {ZodError} from "zod";
import AlertBox from "~/components/ui/AlertBox";
import KeyboardButtonIcon from "~/components/ui/KeyboardButtonIcon";
import {Err, None, Ok, type Option, type Result, Some} from "~/lib/util";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "React ToDo App"},
        {name: "description", content: "Welcome to my React ToDo-app!"},
    ];
}

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]); // Using AppTask[] here
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const result = await getTasks();
                if (result.success) {
                    setTasks(result.data);
                } else {
                    setError(result.error.message);
                }
            } catch (err) {
                setError("Failed to load tasks.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    /// Add a task to the list of tasks async
    /// Returns either an error or undefined when there are no errors
    const addTask = async (taskName: string, status?: Status): Promise<Option<ZodError>> => {
        const result = await addNewTask(tasks, taskName, status);

        // On a successful addition, close the modal and update the tasks with the data property
        if (result.success) {
            closeModal();
            setTasks(result.data);
            return None; // Return undefined/no error
        }

        // When there is an error, use the ZodError or create a new one
        if (result.error instanceof ZodError) {
            return Some(result.error);
        } else {
            // Convert generic Error to ZodError for CreateTask to display
            return Some(new ZodError([{
                code: "custom",
                path: ["name"], // Assuming it's a general form error, attach to 'name' for display
                message: result.error.message || "An unknown error occurred while adding the task."
            }]));
        }
    }

    const removeTaskHandler = async (id: string) => {
        const result = await removeTask(tasks, id);

        setTasks(result);
    }

    // Change the status of a given task, Optimistically update the UI then do an API request
    const changeStatusHandler = async (id: string, newStatusValue: Status) => {
        // Find the task to update
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            console.error(`Task with id ${id} not found.`);
            return;
        }
        const originalTask = tasks[taskIndex]; // Capture original task for rollback

        // Optimistically update the UI
        const optimisticTasks = tasks.map(task =>
            task.id === id ? {...task, status: newStatusValue} : task
        );
        setTasks(optimisticTasks); // Immediate update

        try {
            const updatedTask = await updateTask(tasks, id, newStatusValue, originalTask.name); // Returns updated task or undefined

            if (updatedTask.success && updatedTask.data !== undefined && updatedTask.data !== null) {
                // If update was successful, integrate the updated task into the state
                setTasks(prevTasks =>
                    prevTasks.map(task => (task.id === updatedTask.data!.id ? updatedTask.data! : task))
                );
            } else {
                // If update failed (updatedTask is undefined), revert to original task
                setTasks(prevTasks =>
                    prevTasks.map(task => (task.id === id ? originalTask : task))
                );
            }
        } catch (error) {
            console.error("Failed to update task status:", error);
            // Revert to original task on error
            setTasks(prevTasks =>
                prevTasks.map(task => (task.id === id ? originalTask : task))
            );
            // Optionally, show an error message to the user
        }
    }

    const updateTaskHandler = async (task: Task): Promise<Result<Task, Error>> => {
        try {
            const updatedTask = await updateTask(tasks, task.id, task.status, task.name);

            if (!updatedTask.success || updatedTask.data === undefined) {
                return updatedTask;
            }

            // If update was successful, integrate the updated task into the state
            setTasks(prevTasks =>
                prevTasks.map(task => (task.id === updatedTask.data!.id ? updatedTask.data! : task))
            );

            return Ok(task);
        } catch (error) {
            console.error("Failed to update task status:", error);
            return Err(error as Error);
        }
    };

    const openModalKeyboardButton = "n";

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Do not trigger while typing in an input
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return;
            }

            // Open modal on 'n' key press, if not already open
            if (event.key === openModalKeyboardButton) {
                event.preventDefault();
                isModalOpen ? closeModal() : openModal();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isModalOpen]); // Rerun effect if isModalOpen changes

    if (loading) {
        return (
            <main className="w-11/12 m-auto flex items-center justify-center pt-16 pb-4">
                <p>Loading tasks...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <AlertBox variant={"danger"} message={error} className={"mt-16"}></AlertBox>
            </main>
        );
    }

    return (
        <main className="w-11/12 m-auto flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-5 min-h-0">
                <h1>Task board</h1>
                <p>Press the create task button to create a new task or press
                    '{openModalKeyboardButton.toUpperCase()}'.</p>

                <Button onClick={openModal} className={"flex items-center gap-3 justify-center p-2"}>
                    Create a new Task
                    <KeyboardButtonIcon kb={openModalKeyboardButton.toUpperCase()} />
                </Button>

                <Modal title="Create a new task" isOpen={isModalOpen} onClose={closeModal}>
                    <div className="flex flex-col gap-3">
                        <CreateTask createNewTask={addTask} />
                    </div>
                </Modal>
                <TaskTable data={tasks} removeTask={removeTaskHandler} changeStatus={changeStatusHandler}
                           updateTask={updateTaskHandler} />
            </div>
        </main>
    );
}
