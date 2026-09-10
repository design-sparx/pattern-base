import * as React from "react";
import { cn } from "cn";
import { Separator as SeparatorPrimitive } from "radix-ui";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentProps<typeof SeparatorPrimitive.Root>
>(function Separator(
  { className, orientation = "horizontal", decorative = true, ...props },
  ref,
) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
});

export { Separator };
