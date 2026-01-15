import React from "react";
import Button from "~/components/ui/Button";
import TaskStatusSelectBox from "~/components/tasks/TaskStatusSelectBox";
import {z, ZodError} from "zod";
import {Priority, Status} from "~/GraphQL/generated";
import {fromUndefined, matchOption, type Option} from "~/lib/util";
import InputField from "~/components/ui/InputField";
import TaskPrioritySelectBox from "~/components/tasks/TaskPrioritySelectBox";
import type {UpdateTaskDTO} from "~/dto/taskDTOs";

export interface Props {
    createNewTask: (dto: UpdateTaskDTO) => Promise<Option<ZodError>>;
}

type FormErrors = {
    name?: string[];
    status?: string[];
}

export default function CreateTask(props: Props) {
    const [name, setName] = React.useState("");
    const [status, setStatus] = React.useState<Status>(Status.Ready);
    const [priority, setPriority] = React.useState<Priority>(Priority.None);
    const [errors, setErrors] = React.useState<FormErrors | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await props.createNewTask({
            name: fromUndefined(name),
            status: fromUndefined(status),
            description: fromUndefined<string>(undefined),
            priority: fromUndefined(priority),
            dueDate: fromUndefined<Date>(undefined),
        });
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
                        <InputField label="Task Name" name="name" value={name} onChange={handleNameChange}
                                    error={errors?.name} />
                    </div>
                    <div>
                        <TaskStatusSelectBox label="Task Status" className={"focus:border-pink-300 bg-slate-800"}
                                             name="status"
                                             value={status} error={undefined}
                                             onChange={setStatus} />
                    </div>
                    <div>
                        <TaskPrioritySelectBox label="Task Priority" className={"focus:border-pink-300 bg-slate-800"}
                                               name="priority"
                                               value={priority} error={undefined}
                                               onChange={setPriority} />
                    </div>
                </div>
                <Button onClick={handleSubmit} className="block mt-5" type="submit"
                        disabled={isLoading}>Create new Task</Button>
            </form>
        </>
    );
}