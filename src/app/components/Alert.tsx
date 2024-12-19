import { ReactNode, useEffect, useState } from "react";
import { IconExclamationCircle } from "@tabler/icons-react";

interface AlertProps {
    className?: string;
    active?: boolean;
    message?: string;
    onClear?: () => void;
}

export default function Alert({
    className = "",
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
                className={`absolute left-1/2 -translate-x-1/2 px-4 py-3 rounded-2xl border-2 border-red-500 bg-red-100 flex flex-row items-center ${className}`}
            >  
                <IconExclamationCircle className="text-red-500 me-2" size={28} />
                <p className="font-medium text-red-500">{message}</p>
            </div>
        );
    }
}
