import type {Route} from "./+types/home";
import TaskTable from "~/components/tasks/TaskTable";
import CreateTask from "~/components/tasks/CreateTask";
import {useEffect, useState} from "react";
import Modal from "~/components/ui/Modal";
import Button from "~/components/ui/Button"; // Import Button component
import {addNewTask, getTasks, removeTask} from "~/services/TaskService";
import {Status, type Task} from "~/GraphQL/generated";
import {ZodError} from "zod";

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
                const fetchedTasks = await getTasks();
                setTasks(fetchedTasks);
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
    const addTask = async (taskName: string, status?: Status): Promise<ZodError | undefined> => {
        const result = await addNewTask(tasks, taskName, status);

        // On a successful addition, close the modal and update the tasks with the data property
        if (result.success) {
            closeModal();
            setTasks(result.data);
            return undefined; // Return undefined/no error
        }

        // When there is an error, use the ZodError or create a new one
        if (result.error instanceof ZodError) {
            return result.error;
        } else {
            // Convert generic Error to ZodError for CreateTask to display
            return new ZodError([{
                code: "custom",
                path: ["name"], // Assuming it's a general form error, attach to 'name' for display
                message: result.error.message || "An unknown error occurred while adding the task."
            }]);
        }
    }

    const removeTaskHandler = async (id: string) => {
        const result = await removeTask(tasks, id);

        setTasks(result);
    }

    const changeStatusHandler = async (id: string, status: string) => {

    }

    if (loading) {
        return (
            <main className="w-11/12 m-auto flex items-center justify-center pt-16 pb-4">
                <p>Loading tasks...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="w-11/12 m-auto flex items-center justify-center pt-16 pb-4">
                <p className="text-red-500">{error}</p>
            </main>
        );
    }

    return (
        <main className="w-11/12 m-auto flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <h1>Task board</h1>
                <Button name={"Create a new task"} onClick={openModal} />
                <Modal title="Create a new task" isOpen={isModalOpen} onClose={closeModal}>
                    <div className="flex flex-col gap-3">
                        <CreateTask createNewTask={addTask} />
                    </div>
                </Modal>
                <TaskTable data={tasks} removeTask={removeTaskHandler} changeStatus={changeStatusHandler} />
            </div>
        </main>
    );
}
