import { ReactNode } from "react";

interface ButtonProps {
    className?: string;
    type: "button" | "submit";
    text: string;
    onClick?: () => void;
}

export default function Button({
    className = "",
    type,
    text,
    onClick = () => {}
}: ButtonProps): ReactNode {
    return (
        <button
            className={`py-2 rounded-md bg-orange-400 ${className}`}
            type={type}
            onClick={onClick}
        >
            { text.toUpperCase() }
        </button>
    );
}
