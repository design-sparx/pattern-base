"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function ScrollArea({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <div className="h-full overflow-y-auto overflow-x-hidden">{children}</div>
    </div>
  );
});

ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
