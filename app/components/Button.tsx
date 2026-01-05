import React from "react";

export interface Props {
    name: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function Button(props: Props) {
    return (
        <>
            <button onClick={props.onClick} className={(props.className ?? "") + " p-3 rounded-sm " +
                " dark:bg-pink-300 dark:text-black " +
                " dark:hover:bg-pink-400 "
            }
                    type={props.type ?? "button"}
            >{props.name}</button>
        </>
    )
}