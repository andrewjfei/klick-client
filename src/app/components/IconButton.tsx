import { ReactNode } from "react";

interface IconButtonProps {
    className?: string;
    disabled?: boolean;
    children: ReactNode;
    onClick?: () => void;
}

export default function IconButton({
    className = "",
    disabled = false,
    children,
    onClick = () => {}
}: IconButtonProps): ReactNode {
    return(
        <button
            className={`px-3 py-2 rounded-xl ${disabled ? "bg-stone-300" : "bg-orange-200"} ${className}`}
            type={"button"}
            disabled={disabled}
            onClick={onClick}
        >
            { children }
        </button>
    )
}