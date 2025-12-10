import type { FC } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/utils/utils";

interface TabsTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: string;
    className?: string;
    disabled?: boolean;
}

export const TabsTrigger: FC<TabsTriggerProps> = ({ className, value, disabled, ...props }) => {
    return (
        <TabsPrimitive.Trigger
            value={value}
            disabled={disabled}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                className
            )}
            {...props}
        />
    );
};
