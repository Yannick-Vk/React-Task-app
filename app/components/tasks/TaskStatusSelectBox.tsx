import {Status} from "~/GraphQL/generated"
import React from "react";
import {MapStatusEnum} from "~/lib/util";
import EnumSelectBox from "~/components/ui/EnumSelectBox";

export interface Props {
    name: string;
    className?: string;
    value?: Status; // controlled value (optional)
    onChange?: (value: Status) => void;
}

export default function TaskStatusSelectBox(props: Props) {
    return (
        <>
            <EnumSelectBox name={props.name} enum={Status} mapEnumToLabel={MapStatusEnum}
                           className={props.className}></EnumSelectBox>
        </>
    );
}