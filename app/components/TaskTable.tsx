import Table from "./Table";
import type Task from "../../types/Task";

export interface Props {
    data: Task[];
}

export default function TaskTable(props: Props) {
    return (
        <>
            <Table columns={[
                {key: "id", header: "Id"},
                {key: "title", header: "Title"},
                {key: "status", header: "Status"},
            ]}>
                {props.data.map((item) => (
                    <tr className={"bg-gray-200 even:bg-gray-300 text-black hover:bg-pink-200"}>
                        <td className={"p-3 text-center"}> {item.id} </td>
                        <td className={"p-3 text-center"}> {item.title} </td>
                        <td className={"p-3 text-center"}> {item.status} </td>
                    </tr>
                ))}
            </Table>
        </>
    );
}