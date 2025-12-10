import type { FC } from "react";
import { Label } from "@/components/label";
import { Phone } from "lucide-react";

interface PhoneFieldProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

export const PhoneField: FC<PhoneFieldProps> = ({
    id,
    label,
    placeholder,
    value,
    onChange,
    required = false,
}) => {
    const handleChange = (inputValue: string) => {
        // Solo permitir números y espacios
        const cleaned = inputValue.replace(/[^\d\s]/g, "");
        onChange(cleaned);
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="flex h-9 items-center gap-2 rounded-md border border-input bg-input-background px-3 py-1 transition-[color,box-shadow]">
                <Phone
                    className="h-5 w-5 flex-shrink-0"
                    style={{ color: "var(--roomlock-text-secondary)" }}
                />
                <span
                    className="text-sm flex-shrink-0"
                    style={{ color: "var(--roomlock-text-secondary)" }}
                >
                    +51
                </span>
                <input
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-sm"
                    required={required}
                />
            </div>
        </div>
    );
};
