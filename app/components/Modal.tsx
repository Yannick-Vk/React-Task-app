import React, {Children} from "react";
import Button from "~/components/Button";

export interface Props {
    className?: string;
    children: React.ReactNode;
}

export default function Modal(props: Props) {

    const [state, setState] = React.useState(false)

    return (
        <>
            <Button name={"Open modal"} onClick={() => setState(!state)}></Button>
            <span>{state}</span>
            {Children}
        </>
    );
}