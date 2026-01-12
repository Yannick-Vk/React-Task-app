import React from "react";
import Button from "~/components/Button";
import ButtonRaw from "~/components/ButtonRaw";

export interface Props {
    className?: string;
    children: React.ReactNode;
    title: string;
}

export default function Modal(props: Props) {

    const [isOpen, setIsOpen] = React.useState(false);

    const changeState = () => {
        setIsOpen(!isOpen);
    }

    const showContent = () => {
        if (!isOpen) {
            return null;
        }

        return (
            <div className="fixed inset-0 z-50 overflow-y-auto">
                {/* Background overlay */}
                <div className="fixed inset-0 bg-zinc-800 opacity-80" aria-hidden="true"></div>

                {/* Modal content container */}
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-slate-800 p-5 rounded-lg shadow-lg relative z-50">
                        <div className="flex items-center gap-5 justify-between mb-3">
                            <span className="font-bold text-lg">{props.title}</span>
                            <ButtonRaw onClick={changeState}
                                       className={"rounded-sm hover:text-fuchsia-200 hover:cursor-pointer"}>X</ButtonRaw>
                        </div>
                        <div className={props.className}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Button name={"Open modal"} onClick={changeState}></Button>
            {showContent()}

        </>
    );
}