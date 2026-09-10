import * as React from "react";
import { cn } from "cn";
import { Loader2Icon } from "lucide-react";

const Spinner = React.forwardRef<SVGSVGElement, React.ComponentProps<"svg">>(
  function Spinner({ className, ...props }, ref) {
    return (
      <Loader2Icon
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn("size-4 animate-spin", className)}
        {...props}
      />
    );
  },
);

export { Spinner };
