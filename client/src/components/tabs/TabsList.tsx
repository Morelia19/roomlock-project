import type { FC } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/utils/utils";

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const TabsList: FC<TabsListProps> = ({ className, ...props }) => {
    return (
        <TabsPrimitive.List
            className={cn(
                "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
                className
            )}
            {...props}
        />
    );
};
