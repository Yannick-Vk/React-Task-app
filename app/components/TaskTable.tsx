import Table from "~/components/Table";
import Button from "~/components/Button";
import type Task from "~/types/Task";
import React from "react";
import TaskTypesSelectBox from "~/components/TaskTypesSelectBox";

export interface Props {
    data: Task[];
    removeTask: (id: number) => void;
    changeStatus: (id: number, status: string) => void;
}

export default function TaskTable(props: Props) {

    const changeStatus = (id: number, status: string) => {
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
                        <td className={"p-3 text-center"}> {item.title} </td>
                        <td className={"p-3 text-center"}>
                            <TaskTypesSelectBox name="" value={item.status} className={"bg-slate-200"}
                                                onChange={(e) => changeStatus(item.id, e)}></TaskTypesSelectBox>
                        </td>
                        <td className={"p-3 text-center"}>
                            <Button name="Remove task" onClick={() => props.removeTask(item.id)}/>
                        </td>
                    </tr>
                ))}
            </Table>
        </>
    );
}