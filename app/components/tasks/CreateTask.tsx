import React from "react";
import Button from "~/components/ui/Button";
import TaskStatusSelectBox from "~/components/tasks/TaskStatusSelectBox";
import {z, ZodError} from "zod";
import {Priority, Status} from "~/GraphQL/generated";
import {fromUndefined, matchOption, type Option} from "~/lib/util";
import InputField from "~/components/ui/InputField";
import TaskPrioritySelectBox from "~/components/tasks/TaskPrioritySelectBox";
import type {AddTaskDTO} from "~/dto/taskDTOs";
import {DateTime} from "luxon";
import TextareaField from "~/components/ui/TextareaField";
import AlertBox from "~/components/ui/AlertBox";
import {useStateWithReset} from "~/hooks/useStateWithReset"

export interface Props {
    createNewTask: (dto: AddTaskDTO) => Promise<Option<ZodError | Error>>;
}

type FormErrors = {
    name?: string[];
    status?: string[];
    dueDate?: string[];
    priority?: string[];
    description?: string[];
}

export default function CreateTask(props: Props) {
    // Form data
    const [name, setName, resetName] = useStateWithReset<string>("");
    const [status, setStatus, resetStatus] = useStateWithReset<Status>(Status.Ready);
    const [priority, setPriority, resetPriority] = useStateWithReset<Priority>(Priority.None);
    const [dueDate, setDueDate, resetDueDate] = useStateWithReset<DateTime | undefined>(undefined);
    const [description, setDescription, resetDescription] = useStateWithReset<string>("");
    // Generic
    const [errors, setErrors, resetError] = useStateWithReset<FormErrors | null>(null);
    const [genericError, setGenericError, resetGenericError] = useStateWithReset<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const resetForm = () => {
        resetName();
        resetStatus();
        resetPriority()
        resetDueDate();
        resetDescription()
    }

    const resetErrors = () => {
        resetError();
        resetGenericError();
    }

    const resetFormAndErrors = () => {
        resetForm();
        resetErrors();
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await props.createNewTask({
            name: name,
            status: fromUndefined(status),
            dueDate: fromUndefined(dueDate),
            priority: fromUndefined(priority),
            description: fromUndefined(description),
        });
        setIsLoading(false);

        matchOption(result,
            (val) => {
                // Clear both errors
                resetErrors();

                (val instanceof ZodError) ?
                    setErrors(z.flattenError(val).fieldErrors as FormErrors)
                    : setGenericError(val.message)
                ;
            },
            () => {
                resetFormAndErrors();
            }
        );
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (errors?.name) {
            setErrors({...errors, name: undefined});
        }
    }

    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value ? setDueDate(DateTime.fromISO(e.target.value)) : setDueDate(undefined);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    return (
        <>
            <form className="pt-8 pb-4">
                <div className={"flex flex-col gap-4"}>

                    <InputField label="Task Name" name="name" value={name} onChange={handleNameChange}
                                error={errors?.name} required={true} />

                    <TextareaField label="Description" name="description" value={description}
                                   error={errors?.description}
                                   onChange={handleDescriptionChange} maxCharacters={500} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TaskStatusSelectBox label="Status" className={"focus:border-pink-300 bg-slate-800"}
                                             name="status" value={status} error={errors?.status} onChange={setStatus} />

                        <TaskPrioritySelectBox label="Priority" className={"focus:border-pink-300 bg-slate-800"}
                                               name="priority" value={priority} error={errors?.priority}
                                               onChange={setPriority} />
                    </div>

                    <InputField label={"Due-date"} name={"due-date"} type="datetime-local"
                                value={dueDate?.toFormat("yyyy-LL-dd'T'HH:mm") ?? ""} error={errors?.dueDate}
                                onChange={handleDueDateChange} />

                    {genericError && <AlertBox title="Unexpected error occured" variant="danger" message={genericError}
                                               className={"w-full"} />}

                    <Button onClick={handleSubmit} className="block mt-5" type="submit"
                            disabled={isLoading}>Create new Task</Button>

                </div>
            </form>
        </>
    );
}