import React from "react";
import {twMerge} from "tailwind-merge";

export interface Props {
    className?: string;
    label: string;
    name: string;
    type?: string;
    value: string;
    error: string[] | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField(props: Props) {
    return (
        <>
            <label htmlFor={props.name} className="block font-medium text-gray-300 mb-2">{props.label}</label>
            <input value={props.value} type={props.type} name={props.name} id={props.name} onChange={props.onChange}
                   className={twMerge("rounded-sm border-2 border-slate-300 text-gray-300 p-3 w-full focus:outline-none focus:shadow-outline focus:border-pink-300",
                       props.className)} />
            {props.error?.map((err) => (
                <span className="text-red-500 text-sm">{err}</span>
            ))}
        </>
    );
}