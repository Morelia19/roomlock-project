import type { FC } from "react";
import { cn } from "@/utils/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Card: FC<CardProps> = (className, ...props) => {
    return (
        <div
            data-slot="card"
            className={cn(
                "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
                className,
            )}
            {...props}
        />
    );
}
