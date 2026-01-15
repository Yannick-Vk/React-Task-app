import {Status} from "~/GraphQL/generated"
import React from "react";
import EnumSelectBox from "~/components/ui/EnumSelectBox";
import {twMerge} from "tailwind-merge";

export interface Props {
    name: string;
    className?: string;
    value: Status; // controlled value
    onChange: (value: Status) => void;
    label?: string;
    error: string[] | undefined;
    required?: boolean;
}

export function mapEnum(value: Status): string {
    switch (value) {
        case Status.Done:
            return "Done";
        case Status.InProgress:
            return "In Progress";
        case Status.Ready:
            return "Ready";
        default:
            return value;
    }
}

export default function TaskStatusSelectBox(props: Props) {
    return (
        <EnumSelectBox name={props.name} enum={Status} mapEnumToLabel={mapEnum} value={props.value} error={props.error}
                       className={twMerge("focus:border-pink-300 hover:border-pink-300", props.className)}
                       onChange={props.onChange} required={props.required}
                       order={["Ready", "InProgress", "Done"]} />
    );
}