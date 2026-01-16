import InputField from "~/components/ui/InputField";
import TaskStatusSelectBox from "~/components/tasks/TaskStatusSelectBox";
import Button from "~/components/ui/Button";
import {Priority, Status, type Task} from "~/GraphQL/generated";
import React, {useState} from "react";
import TextareaField from "~/components/ui/TextareaField";
import TaskPrioritySelectBox from "~/components/tasks/TaskPrioritySelectBox";
import AlertBox from "~/components/ui/AlertBox";
import {useStateWithReset} from "~/hooks/useStateWithReset";
import {DateTime} from "luxon";

export interface Props {
    className?: string;
    error: Error | null;
    selectedTask: Task | null;

    // Handle Changes
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onStatusChange: (newStatus: Status) => void;

    // Buttons
    updateTask: () => void;
    reset: () => void;
}

type FormErrors = {
    name?: string[];
    status?: string[];
    dueDate?: string[];
    priority?: string[];
    description?: string[];
}

export default function EditTask(props: Props) {
    // Form data
    const [name, setName] = useState(props.selectedTask?.name);
    const [status, setStatus] = useState(props.selectedTask?.status);
    const [priority, setPriority] = useState(props.selectedTask?.priority);
    const [dueDate, setDueDate] = useState<DateTime | undefined>(props.selectedTask?.dueDate ? DateTime.fromISO(props.selectedTask.dueDate) : undefined);
    const [description, setDescription] = useState(props.selectedTask?.description);
    // Generic
    const [errors, setErrors, resetError] = useStateWithReset<FormErrors | null>(null);
    const [genericError, setGenericError, resetGenericError] = useStateWithReset<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [originalTask, setOriginalTask] = useState(props.selectedTask);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value ? DateTime.fromISO(e.target.value) : undefined);
    }

    const reset = (): void => {
        setName(originalTask?.name);
        setStatus(originalTask?.status);
        setDueDate(originalTask?.dueDate);
        setPriority(originalTask?.priority);
        setDescription(originalTask?.description);
    }

    const updateTask = () => {}

    return (
        <div className="flex flex-col gap-3">
            <p>Update the task, click 'esc' or the close button to cancel. Press reset to go back to the
                original state.</p>
            <InputField label="Task Name" name="name" value={name ?? ""} onChange={handleNameChange}
                        error={errors?.name} required={true} />

            <TextareaField label="Description" name="description" value={description ?? ""}
                           error={errors?.description}
                           onChange={handleDescriptionChange} maxCharacters={500} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TaskStatusSelectBox label="Status" className={"focus:border-pink-300 bg-slate-800"}
                                     name="status" value={status ?? Status.Ready} error={errors?.status}
                                     onChange={setStatus} />

                <TaskPrioritySelectBox label="Priority" className={"focus:border-pink-300 bg-slate-800"}
                                       name="priority" value={priority ?? Priority.None} error={errors?.priority}
                                       onChange={setPriority} />
            </div>

            <InputField label={"Due-date"} name={"due-date"} type="date"
                        value={dueDate?.toISODate() ?? ""} error={errors?.dueDate}
                        onChange={handleDueDateChange} />

            {genericError && <AlertBox title="Unexpected error occured" variant="danger" message={genericError}
                                       className={"w-full"} />}
            <div className={"mt-5 flex flex-row gap-5"}>
                <Button onClick={updateTask}>Save changes</Button>
                <Button onClick={reset}>Reset</Button>
            </div>
        </div>
    );
}