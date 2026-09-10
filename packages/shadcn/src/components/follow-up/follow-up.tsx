import { ArrowRight } from "lucide-react";

import type { FollowUpProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FollowUp({
  followUps,
  onSelect,
  variant = "chip",
  title,
  maxVisible,
}: FollowUpProps) {
  const displayed = maxVisible ? followUps.slice(0, maxVisible) : followUps;

  return (
    <div className="flex flex-col gap-2">
      {title ? (
        <span className="text-muted-foreground text-xs font-medium uppercase">
          {title}
        </span>
      ) : null}

      {variant === "list" ? (
        <div className="flex flex-col gap-1">
          {displayed.map((item) => (
            <button
              key={item.id}
              type="button"
              className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-2 text-left"
              onClick={() => {
                onSelect(item);
              }}
            >
              <div className="flex items-center gap-2">
                {item.icon ? <span>{item.icon}</span> : null}
                <span className="text-sm">{item.text}</span>
              </div>
              <ArrowRight className="size-3.5 opacity-40" />
            </button>
          ))}
        </div>
      ) : null}

      {variant === "button" ? (
        <div className="flex flex-col gap-2">
          {displayed.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              size="sm"
              onClick={() => {
                onSelect(item);
              }}
            >
              {item.icon ? <span>{item.icon}</span> : null}
              {item.text}
              <ArrowRight className="size-3.5" />
            </Button>
          ))}
        </div>
      ) : null}

      {variant === "chip" ? (
        <div className="flex flex-wrap items-center gap-2">
          {displayed.map((item) => (
            <Badge
              key={item.id}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => {
                onSelect(item);
              }}
            >
              {item.text}
              <ArrowRight className="size-3" />
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
