import {Status} from "~/GraphQL/generated"
import React from "react";

export interface Props {
    name: string;
    className?: string;
    value?: Status; // controlled value (optional)
    onChange?: (value: Status) => void;
}

export default function TaskTypesSelectBox(props: Props) {

    const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedKey = e.target.value as keyof typeof Status;
        const selectedValue = Status[selectedKey];
        if (props.onChange) props.onChange(selectedValue);
    }

    // If parent supplied a TaskType value, convert it to the corresponding enum key string
    const selectedKeyFromValue = props.value
        ? (Object.keys(Status).find((k) => Status[k as keyof typeof Status] === props.value) ?? "")
        : undefined;

    return (
        <>
            <select
                className={(props.className ?? "") +
                    " block p-3 mt-2 border-2 border-slate-300 rounded-sm w-full bg-slate-200 focus:outline-none "}
                name={props.name} id={props.name} onChange={changeStatus} value={selectedKeyFromValue}>
                {Object.keys(Status).map(
                    (key) => (
                        <option key={key} value={key} className={""}>{Status[key as keyof typeof Status]}</option>)
                )}
            </select>
        </>
    );
}