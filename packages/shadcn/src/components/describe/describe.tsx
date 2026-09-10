import { Copy } from "lucide-react";

import type { DescribeDetail, DescribeProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function renderDetailValue(detail: DescribeDetail) {
  if (detail.type === "badge") {
    return <Badge variant="secondary">{detail.value}</Badge>;
  }
  if (detail.type === "code" || detail.type === "json") {
    return <code className="font-mono text-xs">{detail.value}</code>;
  }
  return <span className="text-xs">{detail.value}</span>;
}

export function Describe({
  output,
  details,
  inferredPrompt,
  model,
  seed,
  onReuse,
  onCopy,
  title = "Description",
  variant = "panel",
}: DescribeProps) {
  const inner = (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">{title}</span>
        <div className="flex items-center gap-2">
          {model ? <Badge variant="secondary">{model}</Badge> : null}
          {seed ? <Badge variant="secondary">seed: {seed}</Badge> : null}
          {onCopy ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Copy"
                    onClick={onCopy}
                  >
                    <Copy data-icon="inline-start" className="size-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </div>
      </div>

      <span className="text-sm">{output}</span>

      {inferredPrompt ? (
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs font-medium uppercase">
            Inferred Prompt
          </span>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs italic">
                  &ldquo;{inferredPrompt}&rdquo;
                </span>
                {onReuse ? (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => {
                      onReuse(inferredPrompt);
                    }}
                  >
                    Reuse
                  </Badge>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {details.length > 0 ? (
        <div className="flex flex-col gap-1">
          {details.map((detail) => (
            <div
              key={detail.id}
              className="flex items-start justify-between gap-2"
            >
              <span className="text-muted-foreground text-xs">
                {detail.label}
              </span>
              {renderDetailValue(detail)}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );

  if (variant === "inline") {
    return <div className="flex flex-col gap-3">{inner}</div>;
  }

  return (
    <Card>
      <CardContent className="p-4">{inner}</CardContent>
    </Card>
  );
}
