import React from "react";
import Button from "~/components/Button";

export interface Props {
    className?: string;
    children?: React.ReactNode;
}

export default function Modal(props: Props) {

    const [state, setState] = React.useState(false);

    const changeState = () => {
        setState(!state);
    }

    const showContent = () => {
        if (state) {
            return props.children;
        } else {
            return null;
        }
    }

    return (
        <>
            <Button name={"Open modal"} onClick={changeState}></Button>
            <div>
                {showContent()}
            </div>
        </>
    );
}