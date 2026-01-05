import {TaskType} from "../../types/Task";
import React, {useState} from "react";

export interface Props {
    for: string;
    className?: string;
}

export default function TaskTypesSelectBox(props: Props) {

    const [_, setStatus] = useState<TaskType>();

    const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = e.target.value as keyof typeof TaskType;
        setStatus(TaskType[selectedStatus]);
    }

    return (
        <>
            <select
                className={(props.className ?? "") +
                    " block p-3 mt-2 border-2 border-slate-200 rounded-sm w-full bg-black "}
                name={props.for} id={props.for} onChange={changeStatus}>
                {Object.keys(TaskType).map(
                    (key) => (
                        <option key={key} value={key} className={""}>{TaskType[key as keyof typeof TaskType]}</option>)
                )}
            </select>
        </>
    );
}