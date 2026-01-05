export interface Props {
    name: string;
    onClick?: () => void;
}

export default function Button(props: Props) {
    return (
        <>
            <button onClick={props.onClick} className={"p-3 rounded-sm " +
                " dark:bg-pink-300 dark:text-black " +
                " dark:hover:bg-pink-400 "
            }
            >{props.name}</button>
        </>
    )
}