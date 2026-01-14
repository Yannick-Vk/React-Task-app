import React, {useEffect, useRef} from "react";
import ButtonRaw from "~/components/ui/raw/ButtonRaw";

export interface Props {
    className?: string;
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal(props: Props) {
    const modalContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!props.isOpen) return;

        const modal = modalContentRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                props.onClose();
                return; // Stop other keys from activating
            }

            // Prevent tabs from leaving the modal
            // If on the first element go to last element
            // If on the last element go back to the first
            // Else the default will be used
            if (event.key === 'Tab') {
                if (event.shiftKey) { // Shift+Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Focus the second focusable element (the input) in the modal
        if (focusableElements.length > 1) {
            focusableElements[1].focus();
        } else if (firstElement) {
            firstElement.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.isOpen, props.onClose]);

    return (
        <>
            {!props.isOpen ? null : (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Background overlay */}
                    <div className="fixed inset-0 bg-zinc-800 opacity-80" aria-hidden="true"
                         onClick={props.onClose}></div>

                    {/* Modal content container */}
                    <div className="flex items-center justify-center min-h-screen">
                        <div ref={modalContentRef}
                             className="w-11/12 md:w-1/2 bg-slate-800 p-5 rounded-lg shadow-lg relative z-50">
                            <div className="flex items-center gap-5 justify-between mb-3">
                                <span className="font-bold text-lg">{props.title}</span>
                                <ButtonRaw onClick={props.onClose}
                                           className={"rounded-sm hover:text-fuchsia-200 hover:cursor-pointer"}>X</ButtonRaw>
                            </div>
                            <div className={props.className}>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}