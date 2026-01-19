import {twMerge} from "tailwind-merge";
import React from "react";

export interface Props {
    className?: string;
    variant?: BadgeVariant;
    children: React.ReactNode;
}

export enum BadgeVariant {
    gray, error, warning
}

export default function Badge(props: Props) {

    let variant = "";
    switch (props.variant) {
        case BadgeVariant.gray:
            variant = "bg-zinc-500 text-white";
            break;
        case BadgeVariant.error:
            variant = "bg-red-500 text-white";
            break;
        case BadgeVariant.warning:
            variant = "bg-amber-500 text-white";
            break;
        default:
            variant = "bg-gray-500 text-white";
            break;
    }

    return (
        <div className={twMerge("px-2 py-1 rounded-md text-sm", variant, props.className)}>
            {props.children}
        </div>
    );
}