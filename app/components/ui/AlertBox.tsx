export interface Props {
    className?: string;
    message: string;
    variant?: AlertBoxVariant;

}

export type AlertBoxVariant = "success" | "info" | "warning" | "danger" | undefined;

const getAlertColor = (value: AlertBoxVariant) => {
    switch (value) {
        case "success":
            return "text-emerald-800";
        case "warning":
            return "text-amber-600";
        case "danger":
            return "text-red-600";
        default:
            return "";
    }
}

export default function AlertBox(props: Props) {

    const alertColor = getAlertColor(props.variant);

    return (
        <>
            <div
                className={props.className + " w-max py-5 px-8 m-auto flex flex-col items-center justify-center bg-zinc-800 border-2 border-zinc-700 rounded-md"}>
                <h1 className={"text-xl"}>An error occurred while trying to load tasks</h1>
                <p className={alertColor + " text-lg"}>{props.message}</p>
                <p><a href="/" className={"text-sky-500 underline"}>Refresh</a></p>
            </div>
        </>
    );
}