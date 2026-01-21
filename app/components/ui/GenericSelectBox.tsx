import React from "react";
import {twMerge} from "tailwind-merge";
import FormField from "~/components/ui/FormField";

export interface SelectOption {
    label: string;
    value: string;
}

export interface Props {
    name: string;
    className?: string;
    options: SelectOption[],
    value: string;
    onChange: (value: string) => void;
    required: boolean | undefined;
    label?: string;
    error: string[] | undefined;
}

export default function GenericSelectBox(props: Props) {
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        props.onChange(selected);
    }

    const selectBox = (
        <select
            className={twMerge("block p-3 mt-2 border-2 border-slate-300 rounded-sm w-full bg-slate-200 focus:outline-none",
                props.className)}
            name={props.name} id={props.name} onChange={handleOnChange} value={props.value}>
            {props.options.map(option => (
                <option key={option.value} value={option.value} className={""}>
                    {option.label}
                </option>)
            )}
        </select>
    );

    return props.label ? (
        <FormField label={props.label} name={props.name} error={props.error} required={props.required}>
            {selectBox}
        </FormField>
    ) : (
        selectBox
    );
}