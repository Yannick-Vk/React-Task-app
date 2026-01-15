import React from "react";
import {twMerge} from "tailwind-merge";

export interface Props {
    className?: string;
    children: React.ReactNode; // Trigger
    content: React.ReactNode; // Tooltip
}

export default function Tooltip(props: Props) {
    return (
        <div className={"relative group"}>
            {props.children}

            <div
                className={twMerge(
                    "absolute bottom-full mb-2 hidden group-hover:block",
                    "bg-gray-800 text-white text-xs rounded-md px-2 py-1",
                    props.className
                )}>
                {props.content}
            </div>
        </div>
    );
}