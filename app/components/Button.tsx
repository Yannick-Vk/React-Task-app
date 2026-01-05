export interface Props {
    name: string;
    onClick?: () => void;
}

export default function Button(props: Props) {
    return (
        <>
            <button onClick={props.onClick} className={"border-2 " +
                "dark:border-pink-400 dark:bg-pink-300 dark:text-black " +
                "dark:hover:border-pink-500 dark:hover:bg-pink-400 dark:text-black " +
                "p-3 rounded-sm"}
            >{props.name}</button>
        </>
    )
}