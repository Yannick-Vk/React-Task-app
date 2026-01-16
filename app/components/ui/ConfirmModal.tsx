import Modal from "~/components/ui/Modal";
import React from "react";
import Button from "~/components/ui/Button";

export interface Props {
    className?: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    onConfirm: () => void;
    disabled: boolean;
}

export default function ConfirmModal(props: Props) {
    return (
        <>
            <Modal title={props.title} isOpen={props.isOpen} onClose={props.onClose} className={""}>
                <div>
                    {props.children}
                </div>
                <div className={"flex flex-row gap-3 mt-5 text-center"}>
                    <Button onClick={props.onConfirm} disabled={props.disabled}>Confirm</Button>
                    <Button onClick={props.onClose}>Cancel</Button>
                </div>
            </Modal>
        </>
    );
}