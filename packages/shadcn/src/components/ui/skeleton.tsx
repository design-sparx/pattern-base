import * as React from "react";
import { cn } from "cn";

const Skeleton = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function Skeleton({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="skeleton"
        className={cn("bg-accent animate-pulse rounded-md", className)}
        {...props}
      />
    );
  },
);

export { Skeleton };
