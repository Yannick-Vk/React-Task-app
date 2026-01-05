import Table from "~/components/Table";
import Button from "~/components/Button";
import type Task from "~/types/Task";
import React from "react";

export interface Props {
    data: Task[];
    removeTask: (id: number) => void;
}

export default function TaskTable(props: Props) {
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
                        <td className={"p-3 text-center"}> {item.status} </td>
                        <td className={"p-3 text-center"}>
                            <Button name="Remove task" onClick={() => props.removeTask(item.id)}/>
                        </td>
                    </tr>
                ))}
            </Table>
        </>
    );
}