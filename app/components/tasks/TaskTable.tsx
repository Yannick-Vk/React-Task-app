import Table from "~/components/ui/Table";
import Button from "~/components/ui/Button";
import type {Status, Task} from "~/GraphQL/generated"
import React, {useState} from "react";
import TaskTypesSelectBox from "~/components/tasks/TaskTypesSelectBox";
import Modal from "~/components/ui/Modal";
import InputField from "~/components/ui/InputField";

export interface Props {
    data: Task[];
    removeTask: (id: string) => void;
    changeStatus: (id: string, status: Status) => void;
}

export default function TaskTable(props: Props) {

    const changeStatus = (id: string, status: Status) => {
        props.changeStatus(id, status);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setTitle("Title");
        setIsModalOpen(true);
    }
    const closeModal = () => setIsModalOpen(false);

    const [title, setTitle] = useState("");

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
                            <Button onClick={openModal}>Edit task</Button>
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal title={`Edit task: '${title}'`} isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-col gap-3">
                    <InputField label={"Task name"} name={"name"} value={title} />
                    <TaskTypesSelectBox name={"Status"} />
                    <Button onClick={() => {
                    }}>Change status</Button>
                </div>
            </Modal>
        </>
    );
}