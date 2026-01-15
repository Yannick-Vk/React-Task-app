import React from "react";
import ButtonRaw from "~/components/ui/raw/ButtonRaw";
import {twMerge} from "tailwind-merge";

export interface Props {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    children: React.ReactNode;
}

export default function Button(props: Props) {
    return (
        <>
            <ButtonRaw disabled={props.disabled} onClick={props.onClick}
                       className={twMerge("p-3 rounded-sm dark:bg-pink-300 dark:text-black dark:hover:bg-pink-400 disabled:cursor-not-allowed disabled:bg-gray-400",
                           props.className)
                       }
                       type={props.type ?? "button"}
            >
                {props.children}
            </ButtonRaw>
        </>
    )
}