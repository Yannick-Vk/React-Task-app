import Table from "~/components/ui/Table";
import Button from "~/components/ui/Button";
import type {Status, Task} from "~/GraphQL/generated"
import React, {useState} from "react";
import TaskTypesSelectBox from "~/components/tasks/TaskTypesSelectBox";
import Modal from "~/components/ui/Modal";
import InputField from "~/components/ui/InputField";
import type {Result} from "~/lib/util";

export interface Props {
    data: Task[];
    removeTask: (id: string) => void;
    changeStatus: (id: string, status: Status) => void;
    updateTask: (task: Task) => Promise<Result<Task, Error>>;
}

export default function TaskTable(props: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [title, setTitle] = useState("");

    const changeStatus = (id: string, status: Status) => {
        props.changeStatus(id, status);
    };

    const openModal = (task: Task) => {
        setSelectedTask(task);
        setTitle(task.name);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setTitle("");
        setSelectedTask(null);
    };

    const updateTask = async () => {
        if (!selectedTask) return;

        const result = await props.updateTask(selectedTask);

        if (result.success) {
            closeModal();
        } else {
            console.log(result.error);
        }
    };

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        if (newName === selectedTask?.name) return;

        setSelectedTask(previous => {
            if (!previous) return null;

            return {...previous, name: newName};
        })

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
            <Modal title={`Edit task: '${title}'`} isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-col gap-3">
                    <InputField label={"Task name"} name={"name"} value={selectedTask?.name ?? ""}
                                onChange={onNameChange} />
                    <TaskTypesSelectBox name={"Status"} value={selectedTask?.status}
                                        className={"bg-slate-800 text-white focus:border-pink-300"} />
                    <div>
                        <Button onClick={updateTask}>Change status</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}