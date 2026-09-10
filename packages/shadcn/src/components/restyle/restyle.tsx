import { useState } from "react";

import type { RestyleProps } from "@patternbase/core";

import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function Restyle({
  content,
  options,
  onRestyle,
  restyledContent,
  isProcessing = false,
  intensity,
  onIntensityChange,
  title = "Restyle",
  variant = "presets",
}: RestyleProps) {
  const [selectedId, setSelectedId] = useState(options[0]?.id ?? "");

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onRestyle(id);
  };

  const renderOptions = () => {
    if (variant === "gallery") {
      return (
        <div className="grid grid-cols-2 gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className="text-left"
              onClick={() => {
                handleSelect(option.id);
              }}
            >
              <Card
                className={cn(
                  "cursor-pointer",
                  selectedId === option.id && "ring-primary ring-2",
                )}
              >
                <CardContent className="flex flex-col gap-1 p-3">
                  {option.preview ? (
                    <span className="text-muted-foreground line-clamp-2 text-xs italic">
                      {option.preview}
                    </span>
                  ) : null}
                  <span className="text-xs font-medium">{option.label}</span>
                  {option.description ? (
                    <span className="text-muted-foreground text-xs">
                      {option.description}
                    </span>
                  ) : null}
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      );
    }

    if (variant === "slider") {
      return (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs font-medium">
            Style
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                className="cursor-pointer"
                onClick={() => {
                  handleSelect(option.id);
                }}
              >
                <span
                  className={cn(
                    "text-sm",
                    selectedId === option.id
                      ? "text-primary font-semibold"
                      : "text-muted-foreground font-normal",
                  )}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap items-center gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="cursor-pointer"
            onClick={() => {
              handleSelect(option.id);
            }}
          >
            <Card
              className={cn(
                "cursor-pointer",
                selectedId === option.id && "ring-primary ring-2",
              )}
            >
              <CardContent className="flex items-center gap-2 p-3">
                {option.icon ? <span>{option.icon}</span> : null}
                <span className="text-sm">{option.label}</span>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">{title}</span>
        {isProcessing ? <Spinner className="size-3" /> : null}
      </div>

      <Card>
        <CardContent className="p-3">
          <p className="text-sm">{content}</p>
        </CardContent>
      </Card>

      {renderOptions()}

      {intensity !== undefined && onIntensityChange ? (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Intensity</span>
            <span className="text-muted-foreground text-xs">{intensity}%</span>
          </div>
          <Slider
            value={[intensity]}
            onValueChange={(v) => {
              onIntensityChange(v[0] ?? 0);
            }}
            min={0}
            max={100}
            step={1}
          />
        </div>
      ) : null}

      {restyledContent ? (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs font-medium uppercase">
            Result
          </span>
          <Card>
            <CardContent className="p-3">
              <p className="text-sm">{restyledContent}</p>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
