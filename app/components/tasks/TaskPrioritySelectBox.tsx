import {Priority} from "~/GraphQL/generated"
import React from "react";
import GenericSelectBox from "~/components/ui/GenericSelectBox";
import {twMerge} from "tailwind-merge";
import {PriorityOptions} from "~/lib/util";

export interface Props {
    name: string;
    className?: string;
    value: Priority; // controlled value (optional)
    onChange: (value: Priority) => void;
    error: string[] | undefined;
    label?: string;
    required?: boolean;
}

export default function TaskPrioritySelectBox(props: Props) {
    return (
        <GenericSelectBox name={props.name} value={props.value} error={props.error} label={props.label}
                          options={PriorityOptions}
                          className={twMerge("focus:border-pink-300 hover:border-pink-300", props.className)}
                          onChange={(newValue) => props.onChange(newValue as Priority)} required={props.required}
        />
    );
}