import React from "react";
import {twMerge} from "tailwind-merge";
import FormField from "~/components/ui/FormField";

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
        <FormField label={props.label} name={props.name} error={props.error}>
            <input value={props.value} type={props.type} name={props.name} id={props.name} onChange={props.onChange}
                   className={twMerge("rounded-sm border-2 border-slate-300 text-gray-300 p-3 w-full focus:outline-none focus:shadow-outline focus:border-pink-300",
                       props.className)} />
        </FormField>
    );
}