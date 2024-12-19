import { ReactNode } from "react";
import { Scoring } from "@/app/enums";

interface TagProps {
    className?: string;
    text: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    state?: Scoring;
}

export default function Tag({
    className = "",
    text,
    size = "lg",
    state = Scoring.NotStarted
}: TagProps): ReactNode {
    let containerClassName: string = "";
    let textClassName: string = "";

    switch (size) {
        case "xs":
            containerClassName = "px-2 py-0.5";
            textClassName = "text-xs font-medium";
            break;
        case "sm":
            containerClassName = "px-2 py-0.5";
            textClassName = "text-sm";
            break;
        case "md":
            textClassName = "text-base";
            break;
        case "lg":
            containerClassName = "px-3 py-1";
            textClassName = "text-lg font-medium";
            break;
        case "xl":
        default:
            containerClassName = "px-4 py-2";
            textClassName = "text-xl font-semibold";
            break;
    }

    return (
        <div
            className={`inline rounded-md ${state === Scoring.NotStarted ? "bg-orange-400" : state === Scoring.InProgress ? "bg-amber-400" : "bg-green-400"} ${containerClassName} ${className}`}
        >
            <h2 className={`text-white ${textClassName}`}>{text.toUpperCase()}</h2>
        </div>
    );
}
