import FormField from "~/components/ui/FormField";
import React from "react";
import {twMerge} from "tailwind-merge";

export interface Props {
    className?: string;
    label: string;
    name: string;
    value: string;
    error: string[] | undefined;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    maxCharacters: number;
    required?: boolean;
}

export default function TextareaField(props: Props) {
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Only trigger the onChange event when the max has not been exceeded
        if (e.target.value.length <= props.maxCharacters) {
            props.onChange(e);
        }
    }

    const currentCharacterCount = props.value.length;

    return (
        <>
            <FormField label={props.label} name={props.name} error={props.error} required={props.required}>
                <textarea id={props.name} value={props.value} name={props.name} onChange={onChange}
                          maxLength={props.maxCharacters}
                          className={twMerge("rounded-sm border-2 border-slate-300 text-gray-300 p-3 w-full h-max focus:outline-none focus:shadow-outline focus:border-pink-300 hover:border-pink-300", props.className)} />
                <span className={"mt-1 block text-right"}>{currentCharacterCount}/{props.maxCharacters}</span>
            </FormField>
        </>
    );
}