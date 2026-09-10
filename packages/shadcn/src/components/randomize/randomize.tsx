import { Dice5, Shuffle } from "lucide-react";

import type { RandomizeProps } from "@patternbase/core";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Randomize({
  onRandomize,
  isRandomizing = false,
  currentSeed,
  onSeedChange,
  showSeed = false,
  label = "Randomize",
  variant = "button",
}: RandomizeProps) {
  if (variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={onRandomize}
              disabled={isRandomizing}
              aria-label={label}
            >
              <Dice5 className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (variant === "fab") {
    return (
      <Button
        size="icon-lg"
        className="rounded-full"
        onClick={onRandomize}
        disabled={isRandomizing}
        aria-label={label}
      >
        <Shuffle className="size-5" />
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRandomize}
          disabled={isRandomizing}
        >
          <Dice5 className="size-3.5" />
          {label}
        </Button>
      </div>
      {showSeed ? (
        <div className="flex items-center gap-2">
          <Input
            placeholder="Random seed..."
            value={currentSeed ?? ""}
            onChange={(e) => {
              onSeedChange?.(e.currentTarget.value);
            }}
            className="h-7 text-xs"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={onRandomize}
                  aria-label="Randomize seed"
                >
                  <Dice5 className="size-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Randomize seed</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : null}
      {currentSeed && !showSeed ? (
        <span className="text-muted-foreground text-xs">
          Seed: {currentSeed}
        </span>
      ) : null}
    </div>
  );
}
