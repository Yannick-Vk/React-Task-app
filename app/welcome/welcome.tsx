import TaskTable from "~/components/TaskTable";
import type Task from "~/types/Task";
import {TaskType} from "~/types/Task";
import CreateTask from "~/components/CreateTask";
import {useState} from "react";

export function Welcome() {

    const [data, setData] = useState<Task[]>([
        {id: 1, title: "Feed the cats", status: TaskType.READY},
        {id: 2, title: "Do the dishes", status: TaskType.COMPLETED},
        {id: 3, title: "Do Homework", status: TaskType.IN_PROGRESS},
    ]);

    // Create a new task
    const addNewTask = (taskName: string, status?: TaskType) => {
        const name = taskName?.toString().trim();
        if (!name) return; // ignore empty submissions

        setData(prev => {
            const maxId = prev.length ? Math.max(...prev.map(p => p.id)) : 0;
            const newTask: Task = {
                id: maxId + 1,
                title: name,
                status: status ?? TaskType.READY
            };
            return [...prev, newTask];
        });
    }

    // Remove a task by its id
    const removeTask = (id: number) => {
        setData(prev => prev.filter(task => task.id !== id));
    }

    // Change a given task's status
    const changeStatus = (id: number, status: string) => {
        setData(prev => prev.map(task => {
            if (task.id === id) {
                return {...task, status: status as TaskType};
            }
            return task;
        }));
    }

    return (
        <main className="w-11/12 m-auto flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <h1>Task board</h1>

                <CreateTask createNewTask={addNewTask}/>
                <TaskTable data={data} removeTask={removeTask} changeStatus={changeStatus}/>
            </div>
        </main>
    );
}
