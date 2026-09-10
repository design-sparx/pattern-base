import { ChevronDown, ChevronUp, Copy, RefreshCw, ZoomIn } from "lucide-react";
import { useState } from "react";

import type { SummaryProps } from "@patternbase/core";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Summary({
  content,
  originalLength,
  summaryLength,
  onRegenerate,
  onCopy,
  onExpand,
  isGenerating = false,
  title = "Summary",
  variant = "card",
}: SummaryProps) {
  const [collapsed, setCollapsed] = useState(true);

  const inner = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{title}</span>
          {isGenerating ? <Spinner className="size-3" /> : null}
        </div>
        <div className="flex items-center gap-2">
          {originalLength !== undefined && summaryLength !== undefined ? (
            <span className="text-muted-foreground text-xs">
              {summaryLength}/{originalLength} chars
            </span>
          ) : null}
          {onCopy ? (
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
          ) : null}
          {onRegenerate ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Regenerate"
                  onClick={onRegenerate}
                  disabled={isGenerating}
                >
                  <RefreshCw data-icon="inline-start" className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Regenerate</TooltipContent>
            </Tooltip>
          ) : null}
          {onExpand ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Expand"
                  onClick={onExpand}
                >
                  <ZoomIn data-icon="inline-start" className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Expand</TooltipContent>
            </Tooltip>
          ) : null}
          {variant === "collapsible" ? (
            <Button
              size="icon"
              variant="ghost"
              aria-label={collapsed ? "Show content" : "Hide content"}
              onClick={() => {
                setCollapsed((c) => !c);
              }}
            >
              {collapsed ? (
                <ChevronDown className="size-3.5" />
              ) : (
                <ChevronUp className="size-3.5" />
              )}
            </Button>
          ) : null}
        </div>
      </div>

      {variant === "collapsible" ? (
        <Collapsible open={!collapsed}>
          <CollapsibleContent>
            <p className="text-sm">{content}</p>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <p className="text-sm">{content}</p>
      )}
    </div>
  );

  if (variant === "inline") {
    return (
      <TooltipProvider>
        <div className="flex flex-col gap-2">{inner}</div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Card>
        <CardContent className="flex flex-col gap-2 p-4">{inner}</CardContent>
      </Card>
    </TooltipProvider>
  );
}
