import { InputHTMLAttributes, ReactNode } from "react";

interface TextInputProps {
    className?: string;
    type: "text" | "password";
    uppercase?: boolean;
    placeholder: string;
    value: string;
    onChange?: (event: InputHTMLAttributes<HTMLInputElement>) => void;
}

export default function TextInput({
    className = "",
    type,
    uppercase = false,
    placeholder = "",
    value = "",
    onChange = () => { }
}: TextInputProps): ReactNode {
    return (
        <input
            className={`px-5 py-3 rounded-xl border-2 font-medium placeholder:capitalize text-black bg-stone-200 ${uppercase && "uppercase"} ${className}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}
