import { ReactNode, useState } from "react";
import { ToggleButton } from "@/app/components";

interface ToggleButtonGroupProps {
    values: string[];
    onToggle?: (value: string) => void;
}

export default function ToggleButtonGroup({
    values = [],
    onToggle = () => {}
 }: ToggleButtonGroupProps): ReactNode {
    const [toggleButtons, setToggleButtons] = useState(values.map((value: string) => { 
        return { 
            value, 
            toggled: false
        };
    }));

    function handleToggle(index: number): void {
        setToggleButtons((toggleButtons) => toggleButtons.map((toggleButton, i: number) => {
            toggleButton.toggled = i === index;

            return toggleButton;
        }));

        onToggle(toggleButtons[index].value);
    }

    return (
        <div className="flex flex-row justify-between">
            {
                toggleButtons.map((toggleButton, index: number) => (
                    <ToggleButton key={toggleButton.value} toggled={toggleButton.toggled} text={toggleButton.value} onToggle={() => handleToggle(index)} />
                ))
            }
        </div>
    );
}