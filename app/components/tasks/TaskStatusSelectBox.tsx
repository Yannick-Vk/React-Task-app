import {Status} from "~/GraphQL/generated"
import React from "react";
import GenericSelectBox from "~/components/ui/GenericSelectBox";
import {twMerge} from "tailwind-merge";
import {StatusOptions} from "~/lib/util";

export interface Props {
    name: string;
    className?: string;
    value: Status; // controlled value
    onChange: (value: Status) => void;
    label?: string;
    error: string[] | undefined;
    required?: boolean;
}

export default function TaskStatusSelectBox(props: Props) {
    return (
        <GenericSelectBox name={props.name} value={props.value} error={props.error} options={StatusOptions}
                          className={twMerge("focus:border-pink-300 hover:border-pink-300", props.className)}
                          onChange={(newValue) => props.onChange(newValue as Status)} required={props.required}
                          label={props.label}
        />
    );
}