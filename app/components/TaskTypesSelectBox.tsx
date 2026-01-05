import {TaskType} from "~/types/Task";
import React from "react";

export interface Props {
    name: string;
    className?: string;
    value?: TaskType; // controlled value (optional)
    onChange?: (value: TaskType) => void;
}

export default function TaskTypesSelectBox(props: Props) {

    const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedKey = e.target.value as keyof typeof TaskType;
        const selectedValue = TaskType[selectedKey];
        if (props.onChange) props.onChange(selectedValue);
    }

    // If parent supplied a TaskType value, convert it to the corresponding enum key string
    const selectedKeyFromValue = props.value
        ? (Object.keys(TaskType).find((k) => TaskType[k as keyof typeof TaskType] === props.value) ?? "")
        : undefined;

    return (
        <>
            <select
                className={(props.className ?? "") +
                    " block p-3 mt-2 border-2 border-slate-200 rounded-sm w-full bg-black "}
                name={props.name} id={props.name} onChange={changeStatus} value={selectedKeyFromValue}>
                {Object.keys(TaskType).map(
                    (key) => (
                        <option key={key} value={key} className={""}>{TaskType[key as keyof typeof TaskType]}</option>)
                )}
            </select>
        </>
    );
}