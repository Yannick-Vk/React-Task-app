export interface Props {
    className?: string;
    kb: string;
}

import {twMerge} from "tailwind-merge";

export default function KeyboardButtonIcon(props: Props) {
    return (
        <>
            <div
                className={twMerge(
                    "inline-flex items-center justify-center px-2 py-1 min-w-6 h-6 rounded border border-gray-300 bg-gray-100 text-gray-800 text-xs shadow-sm font-sans",
                    props.className
                )}
            >
                {props.kb}
            </div>
        </>
    );
}