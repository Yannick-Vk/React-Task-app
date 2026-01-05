import React from "react";

export interface Props {
    name: string;
    onClick?: (e: React.FormEvent<Element>) => void;
    className?: string;
}

export default function Button(props: Props) {
    return (
        <>
            <button onClick={props.onClick} className={(props.className ?? "") + " p-3 rounded-sm " +
                " dark:bg-pink-300 dark:text-black " +
                " dark:hover:bg-pink-400 "
            }
            >{props.name}</button>
        </>
    )
}