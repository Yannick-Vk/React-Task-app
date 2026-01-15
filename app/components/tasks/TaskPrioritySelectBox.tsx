import {Priority, Status} from "~/GraphQL/generated"
import React from "react";
import EnumSelectBox from "~/components/ui/EnumSelectBox";

export interface Props {
    name: string;
    className?: string;
    value?: Status; // controlled value (optional)
    onChange?: (value: Status) => void;
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
                           className={props.className}></EnumSelectBox>
        </>
    );
}