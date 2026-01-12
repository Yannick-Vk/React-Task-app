import React from "react";
import Button from "~/components/Button";
import TaskTypesSelectBox from "~/components/tasks/TaskTypesSelectBox";
import {TaskType} from "~/types/Task";
import {ZodError} from "zod";

export interface Props {
    createNewTask: (taskName: string, status?: TaskType) => ZodError | undefined;
}

type FormErrors = {
    title?: string[];
    status?: string[];
}

export default function CreateTask(props: Props) {
    const [name, setName] = React.useState("");
    const [status, setStatus] = React.useState<TaskType>(TaskType.READY);
    const [errors, setErrors] = React.useState<FormErrors | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = props.createNewTask(name, status);
        if (result) {
            setErrors(result.flatten().fieldErrors as FormErrors);
        } else {
            setName("");
            setErrors(null);
            // reset form?
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (errors?.title) {
            setErrors({...errors, title: undefined});
        }
    }

    return (
        <>
            <form className="pt-8 pb-4">
                <div className={"flex flex-col gap-4"}>
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-300 mb-2">Task Name</label>
                        <input value={name} onChange={handleNameChange} type="text" name="name" id="name"
                               className={"rounded-sm border-2 border-slate-300 text-gray-300 p-3 w-full focus:outline-none focus:shadow-outline focus:border-pink-300"} />
                        {errors?.title && <span className="text-red-500 text-sm">{errors.title[0]}</span>}
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