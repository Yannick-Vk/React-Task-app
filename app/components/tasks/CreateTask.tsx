import React from "react";
import Button from "~/components/Button";
import TaskTypesSelectBox from "~/components/tasks/TaskTypesSelectBox";
import {TaskType} from "~/types/Task";

export interface Props {
    createNewTask: (taskName: string, status?: TaskType) => void;
}

export default function CreateTask(props: Props) {

    const [name, setName] = React.useState("");
    const [status, setStatus] = React.useState<TaskType>(TaskType.READY);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        props.createNewTask(name, status);
        // reset form?
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setName(e.target.value);

    return (
        <>
            <form className="pt-8 pb-4">
                <div className={"flex flex-col gap-4"}>
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-300 mb-2">Task Name</label>
                        <input value={name} onChange={handleNameChange} type="text" name="name" id="name"
                               className={"rounded-sm border-2 border-slate-300 text-gray-300 p-3 w-full focus:outline-none focus:shadow-outline focus:border-pink-300"} />
                    </div>
                    <div>
                        <label htmlFor="status" className="">Task status</label>
                        <TaskTypesSelectBox className={"focus:border-pink-300 bg-slate-800"} name="status"
                                            value={status}
                                            onChange={setStatus} />
                    </div>
                </div>
                <Button onClick={handleSubmit} name={"Create new Task"} className="block mt-5" type="submit" />
            </form>
        </>
    );
}