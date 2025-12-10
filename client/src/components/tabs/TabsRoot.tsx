import type { FC } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
}

export const Tabs: FC<TabsProps> = ({ defaultValue, value, onValueChange, ...props }) => {
    return (
        <TabsPrimitive.Root
            defaultValue={defaultValue}
            value={value}
            onValueChange={onValueChange}
            {...props}
        />
    );
};
