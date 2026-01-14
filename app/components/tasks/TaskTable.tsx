import Table from "~/components/ui/Table";
import Button from "~/components/ui/Button";
import type {Status, Task} from "~/GraphQL/generated"
import React, {useRef, useState} from "react";
import TaskTypesSelectBox from "~/components/tasks/TaskTypesSelectBox";
import Modal from "~/components/ui/Modal";
import InputField from "~/components/ui/InputField";
import {compareTask, type Result} from "~/lib/util";

export interface Props {
    data: Task[];
    removeTask: (id: string) => void;
    changeStatus: (id: string, status: Status) => void;
    updateTask: (task: Task) => Promise<Result<Task, Error>>;
}

export default function TaskTable(props: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    // Use ref instead  which is better for storing a value that persists across renders but does not need to trigger a re-render when it changes.
    // Since you're setting the original title only once when the modal opens and never changing it again,
    // useRef is a slightly better semantic fit. It signals to future developers (including yourself) that this value is a reference, not a reactive piece of state.
    const originalTask = useRef<Task | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const changeStatus = (id: string, status: Status) => {
        props.changeStatus(id, status);
    };

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

    const updateTask = async () => {
        if (!selectedTask) return;

        if (compareTask(selectedTask, originalTask.current)) {
            setError(new Error("No changes found."));
            return;
        }

        const result = await props.updateTask(selectedTask);

        if (result.success) {
            closeModal();
            setError(null);
        } else {
            console.log(result.error);
            setError(result.error);
        }
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

    return (
        <>
            <Table columns={[
                {key: "title", header: "Title"},
                {key: "status", header: "Status"},
                {key: "actions", header: "Actions"},
            ]}>
                {props.data.map((item) => (
                    <tr className={"bg-gray-200 even:bg-gray-300 text-black hover:bg-pink-200"} key={item.id}>
                        <td className={"p-3 text-center"}> {item.name} </td>
                        <td className={"p-3 text-center"}>
                            <TaskTypesSelectBox name="" value={item.status} className={"bg-slate-200"}
                                                onChange={(e) => changeStatus(item.id, e)}></TaskTypesSelectBox>
                        </td>
                        <td className={"flex flex-row gap-3 justify-center p-3 text-center"}>
                            <Button onClick={() => props.removeTask(item.id)}>Remove task</Button>
                            <Button onClick={() => openModal(item)}>Edit task</Button>
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal title={`Edit task: '${originalTask?.current?.name}'`} isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-col gap-3">
                    <p>Update the task, click 'esc' or the close button to cancel. Press reset to go back to the
                        original state.</p>
                    <InputField label={"Task name"} name={"name"} value={selectedTask?.name ?? ""}
                                onChange={onNameChange} />
                    <TaskTypesSelectBox name={"Status"} value={selectedTask?.status}
                                        className={"bg-slate-800 text-white focus:border-pink-300"}
                                        onChange={onStatusChange} />
                    <div>
                        {error && <span className={"text-red-500"}>{error.message}</span>}
                    </div>
                    <div className={"mt-5 flex flex-row gap-5"}>
                        <Button onClick={updateTask}>Save changes</Button>
                        <Button onClick={reset}>Reset</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}