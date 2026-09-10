import { ChevronDown, Loader2 } from "lucide-react";

import type { ExpandProps } from "@patternbase/core";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function Expand({
  content,
  onExpand,
  expandedContent,
  isExpanding = false,
  title,
  variant = "button",
}: ExpandProps) {
  if (variant === "accordion") {
    return (
      <Accordion type="multiple">
        <AccordionItem value="expand">
          <AccordionTrigger onClick={onExpand}>
            {title ?? "Show full content"}
          </AccordionTrigger>
          <AccordionContent>
            <span className="text-sm">{expandedContent ?? content}</span>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm">{content}</span>
        {expandedContent ? (
          <span className="text-muted-foreground text-sm">
            {expandedContent}
          </span>
        ) : null}
        <Button
          variant="ghost"
          size="sm"
          className="w-fit"
          onClick={onExpand}
          disabled={isExpanding}
        >
          {isExpanding ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <ChevronDown data-icon="inline-start" className="size-3.5" />
          )}
          Expand
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {title ? <span className="text-sm font-semibold">{title}</span> : null}
      <span className="text-sm">{content}</span>
      {expandedContent ? (
        <span className="text-muted-foreground text-sm">{expandedContent}</span>
      ) : null}
      <Button
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={onExpand}
        disabled={isExpanding}
      >
        {isExpanding ? <Loader2 className="size-3.5 animate-spin" /> : null}
        Expand
      </Button>
    </div>
  );
}
