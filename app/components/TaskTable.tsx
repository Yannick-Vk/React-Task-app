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
            ]} data={props.data}/>
        </>
    );
}