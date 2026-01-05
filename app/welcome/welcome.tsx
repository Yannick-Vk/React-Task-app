import TaskTable from "~/components/TaskTable";
import {TodoType} from "../../types/Todo";
import CreateTask from "~/components/CreateTask";

export function Welcome() {
    return (
        <main className="w-11/12 m-auto flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <h1>React Task's example!</h1>

                <CreateTask/>
                <TaskTable
                    data={[
                        {id: 1, title: "Alice", status: TodoType.READY},
                        {id: 2, title: "Bob", status: TodoType.READY},
                        {id: 3, title: "Charlie", status: TodoType.READY},
                        {id: 4, title: "Alice", status: TodoType.READY},
                        {id: 5, title: "Bob", status: TodoType.READY},
                        {id: 6, title: "Charlie", status: TodoType.READY},
                    ]}/>
            </div>
        </main>
    );
}
