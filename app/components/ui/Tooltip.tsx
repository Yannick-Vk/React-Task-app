import React, {useState} from "react";
import {twMerge} from "tailwind-merge";

export interface Props {
    className?: string;
    children: React.ReactNode; // Trigger
    content: React.ReactNode; // Tooltip
}

export default function Tooltip(props: Props) {

    const [isVisible, setIsVisible] = useState(false);
    let hideTimeout: string | number | NodeJS.Timeout | undefined;

    const showTooltip = () => {
        clearTimeout(hideTimeout);
        setIsVisible(true);
    }

    const hideTooltip = () => {
        hideTimeout = window.setTimeout(() => {
            setIsVisible(false);
        }, 100);
    }

    return (
        <div className={"relative"} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {props.children}

            {isVisible && (

                <div
                    className={twMerge(
                        "absolute bottom-full mb-2",
                        "left-1/2 -translate-x-1/2 transform w-full max-w-10/12",
                        "bg-gray-800 text-white text-xs rounded-md px-5 py-2 z-10",
                        props.className
                    )}>
                    {props.content}
                </div>
            )}
        </div>
    );
}