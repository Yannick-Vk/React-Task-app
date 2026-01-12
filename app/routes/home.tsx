import type {Route} from "./+types/home";
import TaskTable from "~/components/tasks/TaskTable";
import CreateTask from "~/components/tasks/CreateTask";
import {useEffect, useState} from "react";
import Modal from "~/components/Modal";
import Button from "~/components/Button"; // Import Button component
import {getTasks} from "~/services/TaskService";
import {Status, type Task} from "~/GraphQL/generated";

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

    const addTask = (taskName: string, status?: Status) => {
        if (!taskName) return;

        closeModal();
        return undefined; // Return undefined to satisfy the CreateTask prop type
    }

    const removeTaskHandler = async (id: number) => {

    }

    const changeStatusHandler = async (id: number, status: string) => {

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
