import type { FC } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/utils/utils";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    className?: string;
}

export const TabsContent: FC<TabsContentProps> = ({ className, value, ...props }) => {
    return (
        <TabsPrimitive.Content
            value={value}
            className={cn(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
            {...props}
        />
    );
};
