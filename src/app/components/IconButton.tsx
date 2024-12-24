import { Icon, IconPlus } from "@tabler/icons-react";
import { ReactNode } from "react";

interface IconButtonProps {
    className?: string;
    variant?: "solid" | "outline";
    disabled?: boolean;
    icon: Icon;
    onClick?: () => void;
}

export default function IconButton({
    className = "",
    variant = "solid",
    disabled = false,
    icon: Icon = IconPlus,
    onClick = () => {}
}: IconButtonProps): ReactNode {
    let containerClassName: string = "";
    let iconClassName: string = "";

    switch (variant) {
        case "outline":
            containerClassName = `${disabled ? "bg-stone-300 border-stone-300" : "border-orange-400 hover:bg-orange-50 hover:border-orange-500 focus:border-orange-500"}`;
            iconClassName = `${disabled ? "text-stone-300" : "text-orange-400 group-hover:text-orange-500 group-focus:text-orange-500"}`;
            break;
        case "solid":
        default:
            containerClassName = `${disabled ? "bg-stone-300 border-stone-300" : "bg-orange-400 border-orange-400 hover:bg-orange-500 hover:border-orange-500 focus:border-orange-500"}`;
            iconClassName = `${disabled ? "text-stone-200" : "text-stone-100"}`;
    }
    return(
        <button
            className={`group px-3 py-2 rounded-xl border-2 transition-all ease-in-out duration-200 ${containerClassName} ${className}`}
            type={"button"}
            disabled={disabled}
            onClick={onClick}
        >
            <Icon className={`${iconClassName}`} stroke={2} size={24} />
        </button>
    )
}