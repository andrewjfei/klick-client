import { ReactNode } from "react";

interface TypographyProps {
    className?: string;
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    text: string;
}

export default function Typography({
    className = "",
    variant = "p",
    text
}: TypographyProps): ReactNode {
    switch (variant) {
        case "h1":
            return (
                <h1
                    className={`my-5 text-3xl font-bold select-none text-black ${className}`}
                >
                    {text}
                </h1>
            );
        case "h2":
            return (
                <h2
                    className={`my-4 text-2xl font-bold select-none text-black ${className}`}
                >
                    {text}
                </h2>
            );
        case "h3":
            return (
                <h3
                    className={`my-3 text-xl font-bold select-none text-black ${className}`}
                >
                    {text}
                </h3>
            );
        case "h4":
            return (
                <h4
                    className={`my-2 text-lg font-bold select-none text-black ${className}`}
                >
                    {text}
                </h4>
            );
        case "h5":
            return (
                <h5
                    className={`my-1 font-bold select-none text-black ${className}`}
                >
                    {text}
                </h5>
            );
        case "h6":
            return (
                <h6
                    className={`my-0.5 text-sm font-bold select-none text-black ${className}`}
                >
                    {text}
                </h6>
            );
        case "p":
        default:
            return (
                <p className={`${className} select-none text-black`}>{text}</p>
            );
    }
}
