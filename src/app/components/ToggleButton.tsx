import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface ToggleButtonProps {
    className?: string;
    disabled?: boolean;
    toggled?: boolean | null;
    text: string;
    onToggle?: () => void;
}

export default function ToggleButton({
    className = "",
    disabled = false,
    toggled = null,
    text,
    onToggle = () => {}
}: ToggleButtonProps): ReactNode {
    const [isToggled, setIsToggled] = useState<boolean>(false);

    useEffect(() => {
        if (toggled !== null) {
            setIsToggled(toggled);
        }
    }, [toggled]);

    function handleToggle(): void {
        if (toggled === null) {
            setIsToggled(!isToggled);
        }

        onToggle();
    }

    return (
        <button
            className={`px-5 py-3 rounded-xl ${isToggled ? "bg-orange-400" : "bg-orange-100"} ${className}`}
            type="button"
            disabled={disabled}
            onClick={handleToggle}
        >
            <p className={`text-xl font-semibold ${isToggled ? "text-white" : "text-orange-400"}`}>{ text.toUpperCase() }</p>
        </button>
    );
}
