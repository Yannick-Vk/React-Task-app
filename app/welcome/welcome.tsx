import TaskTable from "~/components/TaskTable";
import type Task from "../../types/Task";
import {TaskType} from "../../types/Task";
import CreateTask from "~/components/CreateTask";
import {useState} from "react";

export function Welcome() {

    const [data, setData] = useState<Task[]>([
        {id: 1, title: "Alice", status: TaskType.READY},
        {id: 2, title: "Bob", status: TaskType.READY},
        {id: 3, title: "Charlie", status: TaskType.READY},
    ]);

    const addNewTask = (taskName: string) => {

    }

    return (
        <main className="w-11/12 m-auto flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <h1>React Task's example!</h1>

                <CreateTask createNewTask={addNewTask}/>
                <TaskTable data={data}
                />
            </div>
        </main>
    );
}
