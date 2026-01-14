import React, {useRef, useState} from "react";
import type {Status, Task} from "~/GraphQL/generated";
import {compareTask, matchResult, type Result} from "~/lib/util";

export interface Props {
    updateTaskCallback: (task: Task) => Promise<Result<Task, Error>>
}

export function useEditTaskModal(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const originalTask = useRef<Task | null>(null);

    const openModal = (task: Task) => {
        setSelectedTask(task);
        originalTask.current = task;
        setIsModalOpen(true);
        setError(null);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
        originalTask.current = null;
        setError(null);
    };

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        if (newName === selectedTask?.name) return;

        setSelectedTask(prevState => {
            if (!prevState) return null;
            return {...prevState, name: newName};
        });
    };

    const onStatusChange = (newStatus: Status) => {
        setSelectedTask(prevState => {
            if (!prevState) return null;
            return {...prevState, status: newStatus};
        });
    };

    const reset = () => {
        setSelectedTask(originalTask.current);
    };

    const updateTask = async () => {
        if (!selectedTask) return;

        if (compareTask(selectedTask, originalTask.current)) {
            setError(new Error("No changes found."));
            return;
        }

        // It now calls the function that was passed into the hook
        const result = await props.updateTaskCallback(selectedTask);

        matchResult(result,
            () => { // onSuccess
                closeModal();
                setError(null);
            },
            (error: Error) => { // onError
                console.log(error);
                setError(error);
            },
        );
    };

    return {
        isModalOpen,
        selectedTask,
        error,
        originalTask,
        openModal,
        closeModal,
        onNameChange,
        onStatusChange,
        reset,
        updateTask
    };
}