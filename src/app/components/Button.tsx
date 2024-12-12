import { ReactNode } from "react";
import Typography from "./Typography";

interface ButtonProps {
    className?: string;
    type: "button" | "submit";
    disabled?: boolean;
    text: string;
    variant?: "solid" | "outline";
    onClick?: () => void;
}

export default function Button({
    className = "",
    type,
    disabled = false,
    variant = "solid",
    text,
    onClick = () => {}
}: ButtonProps): ReactNode {
    switch (variant) {
        case "outline":
            return (
                <button
                    className={`group px-5 py-3 rounded-xl border-2 bg-transparent transition-all ease-in-out duration-300 ${disabled ? "bg-stone-300 border-stone-300" : "border-orange-400 hover:bg-orange-50 hover:border-orange-500"} ${className}`}
                    type={type}
                    disabled={disabled}
                    onClick={onClick}
                >
                    <Typography 
                        className={`font-medium ${disabled ? "text-stone-400" : "text-orange-400 group-hover:text-orange-500"}`}
                        variant={"p"} 
                        text={text}
                    />
                </button>
            );
        case "solid":
        default:
            return (
                <button
                    className={`px-5 py-3 rounded-xl border-2 transition-all ease-in-out duration-300 ${disabled ? "bg-stone-300 border-stone-300" : "bg-orange-400 border-orange-400 hover:bg-orange-500 hover:border-orange-500"} ${className}`}
                    type={type}
                    disabled={disabled}
                    onClick={onClick}
                >
                    <Typography 
                        className={`font-medium ${disabled ? "text-stone-400" : "text-white"}`}
                        variant={"p"} 
                        text={text}
                    />
                </button>
            );
    }
}
