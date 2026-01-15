import {Status} from "~/GraphQL/generated"
import React from "react";
import EnumSelectBox from "~/components/ui/EnumSelectBox";
import FormField from "~/components/ui/FormField";

export interface Props {
    name: string;
    className?: string;
    value: Status; // controlled value
    onChange: (value: Status) => void;
    label?: string;
    error: string[] | undefined;
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

    const enumSelectBox = (
        <EnumSelectBox name={props.name} enum={Status} mapEnumToLabel={mapEnum} value={props.value}
                       className={props.className} onChange={props.onChange}
                       order={["Ready", "InProgress", "Done"]} />
    );

    return props.label ? (
        <FormField label={props.label} name={props.name} error={props.error}>
            {enumSelectBox}
        </FormField>
    ) : (
        enumSelectBox
    );
}