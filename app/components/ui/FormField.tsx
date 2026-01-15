import React from "react";

export interface Props {
    className?: string;
    label: string;
    name: string;
    error: string[] | undefined;
    children: React.ReactNode;
    required: boolean | undefined;
}

export default function FormField(props: Props) {
    return (
        <div className={props.className}>
            <label htmlFor={props.name}
                   className={"block font-medium text-gray-300 mb-2"}>{props.label} {props.required &&
                <span className="text-red-500 ml-1">*</span>}</label>
            {props.children}
            {props.error?.map((err) => (
                    <span className="text-red-500 text-sm">{err}</span>
                )
            )}
        </div>
    );
}