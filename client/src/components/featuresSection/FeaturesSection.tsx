import type { FC } from "react";
import type { LucideIcon } from 'lucide-react';
import { FeatureCard } from '@/components/featureCard';

interface Feature {
    icon: LucideIcon;
    title: string;
    desc: string;
}

interface FeaturesSectionProps {
    features: Feature[];
}

export const FeaturesSection: FC<FeaturesSectionProps> = ({ features }) => {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <h2 className="mb-12 text-center text-2xl font-semibold" style={{ color: "var(--roomlock-text-primary)" }}>
                    ¿Por qué elegir RoomLock?
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
