import { Bot } from "lucide-react";

import type { DisclosureProps } from "@patternbase/core";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const TYPE_LABELS: Record<DisclosureProps["type"], string> = {
  "ai-generated": "AI Generated",
  "ai-assisted": "AI Assisted",
  "ai-suggested": "AI Suggested",
};

export function Disclosure({
  variant = "badge",
  type,
  model,
  timestamp,
  customLabel,
}: DisclosureProps) {
  const label = customLabel ?? TYPE_LABELS[type];

  if (variant === "badge") {
    return (
      <Badge variant="secondary">
        <Bot className="size-3" />
        {label}
        {model ? ` (${model})` : ""}
      </Badge>
    );
  }

  if (variant === "banner") {
    return (
      <Alert className="mb-2">
        <Bot className="size-4" />
        <AlertDescription>
          <span className="text-sm">
            {label}
            {model ? ` — ${model}` : ""}
            {timestamp ? (
              <span className="text-muted-foreground ml-2 text-xs">
                {new Date(timestamp).toLocaleDateString()}
              </span>
            ) : null}
          </span>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <span className="text-muted-foreground flex items-center gap-1 text-xs">
      <Bot className="size-3" />
      {label}
      {model ? ` (${model})` : ""}
    </span>
  );
}
