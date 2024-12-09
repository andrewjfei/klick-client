import { ReactNode } from "react";

interface NameTagProps {
    className?: string;
    name: string;
}

export default function NameTag({
    className = "",
    name
}: NameTagProps): ReactNode {
    return (
        <div className={`inline px-4 py-2 rounded-md bg-orange-400 ${className}`}>{name.toUpperCase()}</div>
    );
}
