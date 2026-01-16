import {useState} from "react";
import type {Task} from "~/GraphQL/generated";

export interface Props {
    deleteTaskCallback: (id: string) => void;
}

export function useDeleteTaskModal(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const openModal = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
        setError(null);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
        setError(null);
    };
    const onConfirm = () => {
        if (selectedTask) {
            props.deleteTaskCallback(selectedTask.id);
            closeModal();
        }
    };

    return {
        isModalOpen,
        selectedTask,
        error,
        openModal,
        closeModal,
        onConfirm,
    };
}