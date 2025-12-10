import { type FC } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils/utils";

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> { }

export const TabsTrigger: FC<TabsTriggerProps> = ({ className, value, disabled, ...props }) => {
    return (
        <TabsPrimitive.Trigger
            value={value}
            disabled={disabled}
            className={cn(
                "tab-trigger flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
};
