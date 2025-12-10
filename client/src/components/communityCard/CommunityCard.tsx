import type { FC } from "react";
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/button';

interface CommunityCardProps {
    icon: LucideIcon;
    title: string;
    benefits: string[];
    buttonText: string;
    onButtonClick: () => void;
}

export const CommunityCard: FC<CommunityCardProps> = ({
    icon: Icon,
    title,
    benefits,
    buttonText,
    onButtonClick
}) => {
    return (
        <div
            className="border-2 p-8"
            style={{ borderColor: "var(--roomlock-accent)", borderRadius: '20px' }}
        >
            <div className="mb-6 text-center">
                <div
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--roomlock-accent)" }}
                >
                    <Icon className="h-10 w-10" style={{ color: "white" }} />
                </div>
                <h3 className="font-medium text-base" style={{ color: "var(--roomlock-text-primary)" }}>
                    {title}
                </h3>
            </div>

            <ul className="mb-6 space-y-3 text-sm">
                {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                        <div
                            className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: "var(--roomlock-primary)" }}
                        />
                        <span style={{ color: "var(--roomlock-text-secondary)" }}>
                            {benefit}
                        </span>
                    </li>
                ))}
            </ul>

            <Button
                onClick={onButtonClick}
                className="w-full"
                style={{ backgroundColor: "var(--roomlock-cta)", color: "white" }}
            >
                {buttonText}
            </Button>
        </div>
    );
};
