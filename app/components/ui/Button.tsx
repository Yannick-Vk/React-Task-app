import React from "react";
import ButtonRaw from "~/components/ui/raw/ButtonRaw";

export interface Props {
    name: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default function Button(props: Props) {
    return (
        <>
            <ButtonRaw disabled={props.disabled} onClick={props.onClick}
                       className={(props.className ?? "") + " p-3 rounded-sm " +
                " dark:bg-pink-300 dark:text-black " +
                " dark:hover:bg-pink-400 "
            }
                       type={props.type ?? "button"}
            >{props.name}</ButtonRaw>
        </>
    )
}