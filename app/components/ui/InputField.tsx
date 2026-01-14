import React from "react";

export interface Props {
    className?: string;
    label: string;
    name: string;
    type?: string;
    value: string;
    error?: Error[]
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField(props: Props) {
    return (
        <>
            <label htmlFor={props.name} className="block font-medium text-gray-300 mb-2">Task Name</label>
            <input value={props.value} type="text" name="name" id="name" onChange={props.onChange}
                   className={"rounded-sm border-2 border-slate-300 text-gray-300 p-3 w-full focus:outline-none focus:shadow-outline focus:border-pink-300"} />
            {props.error?.map((err) => (
                <span className="text-red-500 text-sm">{err.name}</span>
            ))}
        </>
    );
}