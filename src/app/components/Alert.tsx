import { ReactNode, useEffect, useState } from "react";
import { IconAlertCircle, IconAlertTriangle } from "@tabler/icons-react";

interface AlertProps {
    className?: string;
    variant?: "error" | "success";
    active?: boolean;
    message?: string;
    onClear?: () => void;
}

export default function Alert({
    className = "",
    variant = "error",
    active = false,
    message = "Alert Message",
    onClear = () => {}
}: AlertProps): ReactNode {
    const [isAlertActive, setIsAlertActive] = useState<boolean>(false);

    useEffect(() => {
        if (active) {
            setIsAlertActive(true);

            setTimeout(() => {
                setIsAlertActive(false);
                onClear();
            }, 3000);
        }
    }, [active]);

    if (isAlertActive) {
        return (
            <div
                className={`absolute left-1/2 -translate-x-1/2 px-4 py-3 rounded-2xl border-2 flex flex-row items-center ${variant === "error" ? "border-red-500 bg-red-100" : "border-green-500 bg-green-100"} ${className}`}
            >  
                {
                    variant === "error" ?
                        (
                            <IconAlertTriangle className={`me-2 text-red-500`} size={28} />
                        ) :
                        (
                            <IconAlertCircle className={`me-2 text-green-500`} size={28} />
                        )
                }
                <p className={`font-medium ${variant === "error" ? "text-red-500" : "text-green-500"}`}>{message}</p>
            </div>
        );
    }
}
