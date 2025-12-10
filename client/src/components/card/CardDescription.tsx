import * as React from "react";
import { cn } from "@/utils/utils";

export function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <p
            data-slot="card-description"
            className={cn("text-muted-foreground", className)}
            {...props}
        />
    );
}
