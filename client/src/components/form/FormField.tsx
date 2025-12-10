import type { FC } from "react";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import type { LucideIcon } from "lucide-react";

interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    icon: LucideIcon;
    required?: boolean;
    helperText?: string;
}

export const FormField: FC<FormFieldProps> = ({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    icon: Icon,
    required = false,
    helperText,
}) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <Icon
                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                    style={{ color: "var(--roomlock-text-secondary)" }}
                />
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-10"
                    required={required}
                />
            </div>
            {helperText && (
                <p className="text-sm" style={{ color: "var(--roomlock-text-secondary)" }}>
                    {helperText}
                </p>
            )}
        </div>
    );
};
