import { FormEvent, MouseEvent, ReactNode } from "react";

interface ModalProps {
    isModalOpen: boolean;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    onBackgroundClick?: () => void;
    children: ReactNode;
}

export default function Modal({
    isModalOpen = true,
    onSubmit = () => {},
    onBackgroundClick = () => {},
    children
}: ModalProps): ReactNode {
    function handleBackgroundClick(event: MouseEvent<HTMLDivElement>): void {
        if (event.target === event.currentTarget) {
            onBackgroundClick();
        }
    }

    return (
        isModalOpen && (
            <div 
                className="absolute top-0 left-0 w-dvw h-dvh p-10 bg-stone-900 bg-opacity-15" 
                onClick={handleBackgroundClick}
            >
                <form 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-8 rounded-3xl shadow-lg shadow-stone-400/15 bg-stone-100"
                    onSubmit={onSubmit}
                >
                    {children}
                </form>
            </div>
        )
    );
}