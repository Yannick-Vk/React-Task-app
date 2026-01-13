import Table from "~/components/ui/Table";
import Button from "~/components/ui/Button";
import type {Status, Task} from "~/GraphQL/generated"
import React from "react";
import TaskTypesSelectBox from "~/components/tasks/TaskTypesSelectBox";

export interface Props {
    data: Task[];
    removeTask: (id: string) => void;
    changeStatus: (id: string, status: Status) => void;
}

export default function TaskTable(props: Props) {

    const changeStatus = (id: string, status: Status) => {
        props.changeStatus(id, status);
    }

    return (
        <>
            <Table columns={[
                {key: "id", header: "Id"},
                {key: "title", header: "Title"},
                {key: "status", header: "Status"},
                {key: "actions", header: "Actions"},
            ]}>
                {props.data.map((item) => (
                    <tr className={"bg-gray-200 even:bg-gray-300 text-black hover:bg-pink-200"} key={item.id}>
                        <td className={"p-3 text-center"}> {item.id} </td>
                        <td className={"p-3 text-center"}> {item.name} </td>
                        <td className={"p-3 text-center"}>
                            <TaskTypesSelectBox name="" value={item.status} className={"bg-slate-200"}
                                                onChange={(e) => changeStatus(item.id, e)}></TaskTypesSelectBox>
                        </td>
                        <td className={"p-3 text-center"}>
                            <Button name="Remove task" onClick={() => props.removeTask(item.id)} />
                        </td>
                    </tr>
                ))}
            </Table>
        </>
    );
}