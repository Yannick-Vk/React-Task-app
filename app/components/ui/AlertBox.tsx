import React from "react";
import {twMerge} from "tailwind-merge";

export interface Props {
    className?: string;
    title: string;
    message: string;
    variant?: AlertBoxVariant;
    children?: React.ReactNode;
}

export type AlertBoxVariant = "success" | "info" | "warning" | "danger" | undefined;

const getAlertColor = (value: AlertBoxVariant): string => {
    switch (value) {
        case "success":
            return "border-emerald-800";
        case "warning":
            return "border-amber-400";
        case "danger":
            return "border-red-900";
        default:
            return "border-zinc-700";
    }
}

export default function AlertBox(props: Props) {

    const alertColor = getAlertColor(props.variant);

    return (
        <>
            <div
                className={twMerge("w-max py-5 px-8 m-auto flex flex-col items-center justify-center rounded-md border-2 bg-zinc-800 text-white",
                    alertColor, props.className)}>
                <h1 className={"text-xl"}>{props.title}</h1>
                <p className={"text-lg"}>{props.message}</p>
                {props.children}
            </div>
        </>
    );
}