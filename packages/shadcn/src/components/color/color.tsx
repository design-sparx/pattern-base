import { cn } from "cn";

import type { ColorProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ColorSwatch({
  color,
  size = 24,
  selected,
  onClick,
}: {
  color: string;
  size?: number;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full border",
        onClick ? "cursor-pointer" : "",
        selected ? "ring-primary ring-2 ring-offset-2" : "",
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
      onClick={onClick}
    />
  );
}

export function Color({
  options,
  selectedColorId,
  onSelectColor,
  title,
  showLabels = false,
  variant = "swatches",
}: ColorProps) {
  if (variant === "chips") {
    return (
      <div className="flex flex-col gap-2">
        {title ? <span className="text-sm font-medium">{title}</span> : null}
        <div className="flex flex-wrap items-center gap-2">
          {options.map((option) => (
            <Badge
              key={option.id}
              variant={selectedColorId === option.id ? "default" : "outline"}
              className={onSelectColor ? "cursor-pointer" : ""}
              style={{
                borderColor: option.value,
                color: selectedColorId === option.id ? "white" : option.value,
                backgroundColor:
                  selectedColorId === option.id ? option.value : undefined,
              }}
              onClick={() => onSelectColor?.(option.id)}
            >
              <span
                className="mr-1 inline-block size-2 rounded-full"
                style={{ backgroundColor: option.value }}
              />
              {option.label}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3">
            {title ? (
              <span className="text-sm font-semibold">{title}</span>
            ) : null}
            <div className="grid grid-cols-4 gap-2">
              {options.map((option) => (
                <div
                  key={option.id}
                  className="flex flex-col items-center gap-1"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <ColorSwatch
                            color={option.value}
                            size={32}
                            selected={selectedColorId === option.id}
                            onClick={() => onSelectColor?.(option.id)}
                          />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{option.label}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-muted-foreground text-center text-xs">
                    {option.label}
                  </span>
                  {option.description ? (
                    <span className="text-muted-foreground line-clamp-1 text-center text-xs">
                      {option.description}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {title ? <span className="text-sm font-medium">{title}</span> : null}
      <div className="flex flex-wrap items-center gap-2">
        {options.map((option) => (
          <div key={option.id} className="flex flex-col items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <ColorSwatch
                      color={option.value}
                      size={24}
                      selected={selectedColorId === option.id}
                      onClick={() => onSelectColor?.(option.id)}
                    />
                  </span>
                </TooltipTrigger>
                <TooltipContent>{option.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {showLabels ? (
              <span className="text-muted-foreground text-xs">
                {option.label}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      {selectedColorId ? (
        <div className="flex items-center gap-2">
          <ColorSwatch
            color={
              options.find((o) => o.id === selectedColorId)?.value ?? "#000"
            }
            size={16}
          />
          <span className="text-muted-foreground text-xs">
            {options.find((o) => o.id === selectedColorId)?.label}
          </span>
        </div>
      ) : null}
    </div>
  );
}
