import {Priority} from "~/GraphQL/generated"
import React from "react";
import EnumSelectBox from "~/components/ui/EnumSelectBox";

export interface Props {
    name: string;
    className?: string;
    value?: Priority; // controlled value (optional)
    onChange: (value: Priority) => void;
}

export function MapEnum(value: Priority): string {
    switch (value) {
        case Priority.Low:
            return "Low";
        case Priority.Medium:
            return "Medium";
        case Priority.High:
            return "High";
        case Priority.None:
            return "None";
        default:
            return value;
    }
}

export default function TaskPrioritySelectBox(props: Props) {
    return (
        <>
            <EnumSelectBox name={props.name} enum={Priority} mapEnumToLabel={MapEnum}
                           className={props.className} onChange={props.onChange}></EnumSelectBox>
        </>
    );
}