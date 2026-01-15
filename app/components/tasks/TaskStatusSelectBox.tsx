import {Status} from "~/GraphQL/generated"
import React from "react";
import EnumSelectBox from "~/components/ui/EnumSelectBox";

export interface Props {
    name: string;
    className?: string;
    value?: Status; // controlled value (optional)
    onChange?: (value: Status) => void;
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
        <>
            <EnumSelectBox name={props.name} enum={Status} mapEnumToLabel={mapEnum}
                           className={props.className}></EnumSelectBox>
        </>
    );
}