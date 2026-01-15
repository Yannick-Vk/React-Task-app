import {Priority} from "~/GraphQL/generated"
import React from "react";
import EnumSelectBox from "~/components/ui/EnumSelectBox";
import FormField from "~/components/ui/FormField";
import {twMerge} from "tailwind-merge";

export interface Props {
    name: string;
    className?: string;
    value: Priority; // controlled value (optional)
    onChange: (value: Priority) => void;
    error: string[] | undefined;
    label?: string;
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

    const enumSelectBox = (
        <EnumSelectBox name={props.name} enum={Priority} mapEnumToLabel={MapEnum} value={props.value}
                       className={twMerge("focus:border-pink-300 hover:border-pink-300", props.className)}
                       onChange={props.onChange}
                       order={["None", "Low", "Medium", "High"]} />
    );

    return props.label ? (
        <FormField label={props.label} name={props.name} error={props.error}>
            {enumSelectBox}
        </FormField>
    ) : (
        enumSelectBox
    );
}