"use client";

import * as React from "react";
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentProps<typeof AccordionPrimitive.Root>
>(function Accordion({ ...props }, ref) {
  return <AccordionPrimitive.Root ref={ref} data-slot="accordion" {...props} />;
});

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentProps<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
});

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentProps<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none transition-all hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentProps<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
