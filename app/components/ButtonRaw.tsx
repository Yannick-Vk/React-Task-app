import React from "react";

export interface Props {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
}

export default function ButtonRaw(props: Props) {
    return (
        <>
            <button onClick={props.onClick} className={(props.className ?? "")}
                    type={props.type ?? "button"}
            >{props.children}</button>
        </>
    );
}