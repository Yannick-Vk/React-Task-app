import type {Route} from "./+types/home";
import TaskTable from "~/components/tasks/TaskTable";
import CreateTask from "~/components/tasks/CreateTask";
import {useEffect, useState} from "react";
import Modal from "~/components/ui/Modal";
import Button from "~/components/ui/Button";
import AlertBox from "~/components/ui/AlertBox";
import KeyboardButtonIcon from "~/components/ui/KeyboardButtonIcon";
import {useTaskManager} from "~/hooks/useTaskManager";
import {type Option} from "~/lib/util";
import type {ZodError} from "zod";
import type {Status} from "~/GraphQL/generated";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "React ToDo App"},
        {name: "description", content: "Welcome to my React ToDo-app!"},
    ];
}

export default function Home() {
    const {
        tasks,
        loading,
        error,
        addTask,
        removeTaskHandler,
        changeStatusHandler,
        updateTaskHandler
    } = useTaskManager();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // This function now connects the data logic (addTask) with the UI logic (closeModal)
    const handleAddTask = async (taskName: string, status?: Status): Promise<Option<ZodError>> => {
        const result = await addTask(taskName, status);

        if (!result.some) { // If there is no error (`None`)
            closeModal();
        }
        return result;
    }

    const openModalKeyboardButton = "n";
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
            if (event.key === openModalKeyboardButton) {
                event.preventDefault();
                isModalOpen ? closeModal() : openModal();
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [isModalOpen]);

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
                        <CreateTask createNewTask={handleAddTask} />
                    </div>
                </Modal>
                <TaskTable data={tasks} removeTask={removeTaskHandler} changeStatus={changeStatusHandler}
                           updateTask={updateTaskHandler} />
            </div>
        </main>
    );
}
