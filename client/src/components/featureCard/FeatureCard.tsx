import type { FC } from "react";
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
    return (
        <div className="text-center">
            <div
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--roomlock-accent)" }}
            >
                <Icon className="h-10 w-10" style={{ color: "white" }} />
            </div>
            <h3 className="mb-2 font-medium" style={{ color: "var(--roomlock-text-primary)" }}>
                {title}
            </h3>
            <p className="text-sm" style={{ color: "var(--roomlock-text-secondary)" }}>
                {description}
            </p>
        </div>
    );
};
