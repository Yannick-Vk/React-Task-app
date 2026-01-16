import InputField from "~/components/ui/InputField";
import TaskStatusSelectBox from "~/components/tasks/TaskStatusSelectBox";
import Button from "~/components/ui/Button";
import {Status, type Task} from "~/GraphQL/generated";
import React from "react";

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

export default function EditTask(props: Props) {
    return (
        <div className="flex flex-col gap-3">
            <p>Update the task, click 'esc' or the close button to cancel. Press reset to go back to the
                original state.</p>
            <InputField label={"Task name"} name={"name"} value={props.selectedTask?.name ?? ""}
                        onChange={props.onNameChange} error={undefined} />
            <TaskStatusSelectBox name={"Status"} value={props.selectedTask?.status ?? Status.Ready} error={undefined}
                                 className={"bg-slate-800 text-white focus:border-pink-300"}
                                 onChange={props.onStatusChange} />
            <div>
                {props.error && <span className={"text-red-500"}>{props.error.message}</span>}
            </div>
            <div className={"mt-5 flex flex-row gap-5"}>
                <Button onClick={props.updateTask}>Save changes</Button>
                <Button onClick={props.reset}>Reset</Button>
            </div>
        </div>
    );
}