import {twMerge} from "tailwind-merge";

export interface Props {
    className?: string;
    variant?: "gray" | "error" | "warning";
}

export default function Badge(props: Props) {
    return (
        <>
            <div className={twMerge("", props.className)}>

            </div>
        </>
    );
}