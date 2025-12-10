import * as React from "react";
import { cn } from "@/utils/utils";

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <h4
            data-slot="card-title"
            className={cn("leading-none", className)}
            {...props}
        />
    );
}
