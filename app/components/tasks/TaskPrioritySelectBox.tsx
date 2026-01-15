import {Priority} from "~/GraphQL/generated"
import React from "react";
import EnumSelectBox from "~/components/ui/EnumSelectBox";
import {twMerge} from "tailwind-merge";

export interface Props {
    name: string;
    className?: string;
    value: Priority; // controlled value (optional)
    onChange: (value: Priority) => void;
    error: string[] | undefined;
    label?: string;
    required?: boolean;
}

export function MapEnum(value: Priority): string {
    switch (value) {
        case Priority.None:
            return "None";
        case Priority.Low:
            return "Low";
        case Priority.Medium:
            return "Medium";
        case Priority.High:
            return "High";
        default:
            return value;
    }
}

export default function TaskPrioritySelectBox(props: Props) {
    return (
        <EnumSelectBox name={props.name} enum={Priority} mapEnumToLabel={MapEnum} value={props.value}
                       error={props.error}
                       className={twMerge("focus:border-pink-300 hover:border-pink-300", props.className)}
                       onChange={props.onChange} required={props.required}
                       order={["None", "Low", "Medium", "High"]} />
    );
}