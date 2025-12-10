import * as React from "react";

import { cn } from "@/utils/utils";

export const DialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <div
            data-slot="dialog-header"
            className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
            {...props}
        />
    );
}
