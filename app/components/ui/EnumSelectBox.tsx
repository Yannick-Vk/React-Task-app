import React from "react";
import {twMerge} from "tailwind-merge";

export interface Props<TEnum extends Record<string, string>> {
    name: string;
    className?: string;
    enum: TEnum;
    value?: TEnum[keyof TEnum];
    onChange: (value: TEnum[keyof TEnum]) => void;
    mapEnumToLabel: (value: TEnum[keyof TEnum]) => string;
}

export default function EnumSelectBox<TEnum extends Record<string, string>>(props: Props<TEnum>) {
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedKey = e.target.value as keyof typeof props.enum
        const selectedValue = props.enum[selectedKey];
        props.onChange(selectedValue);
    }

    // If parent supplied a TaskType value, convert it to the corresponding enum key string
    const selectedKeyFromValue = props.value
        ? (Object.keys(props.enum).find((k) => props.enum[k as keyof typeof props.enum] === props.value) ?? "")
        : undefined;

    return (
        <>
            <select
                className={twMerge("block p-3 mt-2 border-2 border-slate-300 rounded-sm w-full bg-slate-200 focus:outline-none",
                    props.className)}
                name={props.name} id={props.name} onChange={handleOnChange} value={selectedKeyFromValue}>
                {Object.keys(props.enum).map(
                    (key) => (
                        <option key={key} value={key}
                                className={""}>{props.mapEnumToLabel(props.enum[key as keyof typeof props.enum])}</option>)
                )}
            </select>
        </>
    );
}