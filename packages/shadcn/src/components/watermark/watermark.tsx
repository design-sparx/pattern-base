import { Droplet, ShieldCheck } from "lucide-react";

import type { WatermarkProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Watermark({
  label = "AI Generated",
  visibility = "visible",
  variant = "badge",
  confidence,
  algorithm,
  onVerify,
}: WatermarkProps) {
  if (visibility === "invisible" && variant !== "banner") {
    return null;
  }

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2">
        <Droplet className="size-3 opacity-50" />
        <span className="text-muted-foreground text-xs">{label}</span>
        {confidence !== undefined ? (
          <span className="text-muted-foreground text-xs">
            ({Math.round(confidence * 100)}%)
          </span>
        ) : null}
        {onVerify ? (
          <Button variant="ghost" size="sm" className="h-7" onClick={onVerify}>
            Verify
          </Button>
        ) : null}
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className="bg-muted flex flex-col gap-2 rounded p-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4" />
          <span className="text-sm font-medium">{label}</span>
          {confidence !== undefined ? (
            <Badge variant="secondary" className="text-xs">
              {Math.round(confidence * 100)}% confident
            </Badge>
          ) : null}
        </div>
        {algorithm ? (
          <span className="text-muted-foreground text-xs">
            Algorithm: {algorithm}
          </span>
        ) : null}
        {onVerify ? (
          <Button variant="secondary" size="sm" onClick={onVerify}>
            <ShieldCheck className="size-3" />
            Verify
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary">
        <Droplet className="size-2.5" />
        {label}
        {confidence !== undefined
          ? ` · ${String(Math.round(confidence * 100))}%`
          : null}
      </Badge>
      {onVerify ? (
        <Button variant="ghost" size="sm" className="h-7" onClick={onVerify}>
          Verify
        </Button>
      ) : null}
    </div>
  );
}
