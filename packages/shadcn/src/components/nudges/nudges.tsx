import { AlertTriangle, Info, Lightbulb, X } from "lucide-react";
import { useState } from "react";

import type { NudgesProps } from "@patternbase/core";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function Nudges({ nudges, onDismiss, maxVisible }: NudgesProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = nudges
    .filter((n) => !dismissed.has(n.id))
    .slice(0, maxVisible ?? nudges.length);

  if (visible.length === 0) return null;

  const getIcon = (type?: string) => {
    if (type === "reminder") return <AlertTriangle className="size-4" />;
    if (type === "suggestion") return <Info className="size-4" />;
    return <Lightbulb className="size-4" />;
  };

  return (
    <div className="flex flex-col gap-2">
      {visible.map((nudge) => (
        <Alert key={nudge.id}>
          {nudge.icon ? <span>{nudge.icon}</span> : getIcon(nudge.type)}
          <div className="flex flex-1 items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <AlertDescription>{nudge.message}</AlertDescription>
              {nudge.actionLabel && nudge.onAction ? (
                <Button
                  variant="ghost"
                  size="xs"
                  className="mt-1 w-fit"
                  onClick={nudge.onAction}
                >
                  {nudge.actionLabel}
                </Button>
              ) : null}
            </div>
            {onDismiss ? (
              <button
                type="button"
                className="shrink-0 opacity-50 hover:opacity-100"
                aria-label="Dismiss"
                onClick={() => {
                  setDismissed((prev) => new Set(prev).add(nudge.id));
                  onDismiss(nudge.id);
                }}
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>
        </Alert>
      ))}
    </div>
  );
}
