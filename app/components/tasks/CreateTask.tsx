import React from "react";
import Button from "~/components/ui/Button";
import TaskTypesSelectBox from "~/components/tasks/TaskTypesSelectBox";
import {z, ZodError} from "zod";
import {Status} from "~/GraphQL/generated";
import {matchOption, type Option} from "~/lib/util";
import InputField from "~/components/ui/InputField";

export interface Props {
    createNewTask: (taskName: string, status?: Status) => Promise<Option<ZodError>>;
}

type FormErrors = {
    name?: string[];
    status?: string[];
}

export default function CreateTask(props: Props) {
    const [name, setName] = React.useState("");
    const [status, setStatus] = React.useState<Status>(Status.Ready);
    const [errors, setErrors] = React.useState<FormErrors | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await props.createNewTask(name, status);
        setIsLoading(false);

        matchOption(result,
            (val) => setErrors(z.flattenError(val).fieldErrors as FormErrors),
            () => {
                setName("");
                setErrors(null)
            }
        );
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (errors?.name) {
            setErrors({...errors, name: undefined});
        }
    }

    return (
        <>
            <form className="pt-8 pb-4">
                <div className={"flex flex-col gap-4"}>
                    <div>
                        <InputField label={"Task Name"} name="name" value={name} onChange={handleNameChange}
                                    error={errors?.name} />
                    </div>
                    <div>
                        <label htmlFor="status" className="">Task status</label>
                        <TaskTypesSelectBox className={"focus:border-pink-300 bg-slate-800"} name="status"
                                            value={status}
                                            onChange={setStatus} />
                    </div>
                </div>
                <Button onClick={handleSubmit} className="block mt-5" type="submit"
                        disabled={isLoading}>Create new Task</Button>
            </form>
        </>
    );
}