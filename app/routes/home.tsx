import type {Route} from "./+types/home";
import TaskTable from "~/components/tasks/TaskTable";
import {addNewTask, changeStatus, initialTasks, removeTask} from "~/services/TaskService";
import type {Task} from "~/types/Task";
import {TaskType} from "~/types/Task";
import CreateTask from "~/components/tasks/CreateTask";
import {useState} from "react";
import Modal from "~/components/Modal";
import Button from "~/components/Button"; // Import Button component

export function meta({}: Route.MetaArgs) {
    return [
        {title: "React ToDo App"},
        {name: "description", content: "Welcome to my React ToDo-app!"},
    ];
}

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Create a new task
    const addTask = (taskName: string, status?: TaskType) => {
        const newTasks = addNewTask(tasks, taskName, status);
        if (newTasks) {
            setTasks(newTasks);
            closeModal();
        }
    }

    // Remove a task by its id
    const removeTaskHandler = (id: number) => {
        const newTasks = removeTask(tasks, id);
        setTasks(newTasks);
    }

    // Change a given task's status
    const changeStatusHandler = (id: number, status: string) => {
        const newTasks = changeStatus(tasks, id, status);
        setTasks(newTasks);
    }

    return (
        <main className="w-11/12 m-auto flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <h1>Task board</h1>
                <Button name={"Create a new task"} onClick={openModal} /> {/* Button to open modal */}
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
