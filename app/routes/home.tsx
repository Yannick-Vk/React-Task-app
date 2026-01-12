import type {Route} from "./+types/home";
import TaskTable from "~/components/tasks/TaskTable";
import type Task from "~/types/Task";
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
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: "Feed the cats", status: TaskType.READY},
        {id: 2, title: "Do the dishes", status: TaskType.COMPLETED},
        {id: 3, title: "Do Homework", status: TaskType.IN_PROGRESS},
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Create a new task
    const addNewTask = (taskName: string, status?: TaskType) => {
        const name = taskName?.toString().trim();
        if (!name) return; // ignore empty submissions

        setTasks(prev => {
            const maxId = prev.length ? Math.max(...prev.map(p => p.id)) : 0;
            const newTask: Task = {
                id: maxId + 1,
                title: name,
                status: status ?? TaskType.READY
            };
            return [...prev, newTask];
        });
        closeModal(); // Close modal after adding task
    }

    // Remove a task by its id
    const removeTask = (id: number) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    }

    // Change a given task's status
    const changeStatus = (id: number, status: string) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                return {...task, status: status as TaskType};
            }
            return task;
        }));
    }

    return (
        <main className="w-11/12 m-auto flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <h1>Task board</h1>
                <Button name={"Create a new task"} onClick={openModal} /> {/* Button to open modal */}
                <Modal title="Create a new task" isOpen={isModalOpen} onClose={closeModal}>
                    <div className="flex flex-col gap-3">
                        <CreateTask createNewTask={addNewTask} />
                    </div>
                </Modal>
                <TaskTable data={tasks} removeTask={removeTask} changeStatus={changeStatus} />
            </div>
        </main>
    );
}
