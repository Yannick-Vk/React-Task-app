import React from "react";

export interface Props {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    disabled?: boolean;
}

export default function ButtonRaw(props: Props) {
    return (
        <>
            <button disabled={props.disabled ?? false} onClick={props.onClick} className={(props.className ?? "")}
                    type={props.type ?? "button"}
            >{props.children}</button>
        </>
    );
}