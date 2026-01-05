import Table from "./Table";
import type Todo from "../../types/Todo";

export interface Props {
    data: Todo[];
}

export default function ToDoTable(props: Props) {
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