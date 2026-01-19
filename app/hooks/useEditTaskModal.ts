import {useState} from "react";
import type {Task} from "~/GraphQL/generated";
import {type Result} from "~/lib/util";
import type {UpdateTaskDTO} from "~/dto/taskDTOs";

export interface Props {
    updateTaskCallback: (task: UpdateTaskDTO) => Promise<Result<Task, Error>>
}

export function useEditTaskModal(props: Props) {
    const [isSaving, setIsSaving] = useState(false);
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

    const onSave = async (updatedTask: UpdateTaskDTO): Promise<Result<Task, Error>> => {
        setIsSaving(true);

        const result = await props.updateTaskCallback(updatedTask);

        result.match(
            () => { // onSuccess
                closeModal();
                setError(null);
            },
            (error: Error) => { // onError
                console.log(error);
                setError(error);
            },
        );
        setIsSaving(false);
        return result;
    };

    return {
        isModalOpen,
        selectedTask,
        error,
        openModal,
        closeModal,
        updateTask: onSave
    };
}