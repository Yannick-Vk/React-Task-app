import {useState} from "react";
import type {Task} from "~/GraphQL/generated";
import {matchResult, type Result} from "~/lib/util";

export interface Props {
    deleteTaskCallback: (id: string) => Promise<Result<string, Error>>;
}

export function useDeleteTaskModal(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

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
    const onConfirm = async () => {
        if (!selectedTask || isDeleting) return;
        setIsDeleting(true);
        setError(null);

        // A delay to test out the button disable
        // await new Promise(resolve => setTimeout(resolve, 1500));

        const result = await props.deleteTaskCallback(selectedTask.id);

        matchResult(result,
            () => {
                closeModal();
            },
            (err) => {
                setError(err);
            },
        );
        setIsDeleting(false);
    };

    return {
        isModalOpen,
        selectedTask,
        error,
        openModal,
        closeModal,
        onConfirm,
        isDeleting,
    };
}