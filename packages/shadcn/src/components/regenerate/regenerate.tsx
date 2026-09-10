import { Loader2, RefreshCw } from "lucide-react";

import type { RegenerateProps } from "@patternbase/core";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Regenerate({
  onRegenerate,
  isRegenerating = false,
  variant = "button",
  options,
}: RegenerateProps) {
  if (variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Regenerate"
              onClick={onRegenerate}
              disabled={isRegenerating}
            >
              {isRegenerating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <RefreshCw data-icon="inline-start" className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Regenerate</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (variant === "dropdown" && options && options.length > 0) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={isRegenerating}>
            {isRegenerating ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <RefreshCw data-icon="inline-start" className="size-3.5" />
            )}
            Regenerate
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onRegenerate}>Regenerate</DropdownMenuItem>
          <DropdownMenuSeparator />
          {options.map((opt) => (
            <DropdownMenuItem key={opt.label} onClick={opt.onSelect}>
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onRegenerate}
      disabled={isRegenerating}
    >
      {isRegenerating ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <RefreshCw data-icon="inline-start" className="size-3.5" />
      )}
      Regenerate
    </Button>
  );
}
