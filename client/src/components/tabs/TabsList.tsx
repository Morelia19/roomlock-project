import { type FC } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils/utils";

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> { }

export const TabsList: FC<TabsListProps> = ({ className, ...props }) => {
    return (
        <TabsPrimitive.List
            className={cn(
                "flex flex-row h-12 items-center justify-center rounded-full bg-muted p-1 text-muted-foreground gap-1",
                className
            )}
            {...props}
        />
    );
};
