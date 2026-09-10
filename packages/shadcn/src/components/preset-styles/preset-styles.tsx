import type { PresetStylesProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PresetStyles({
  presets,
  selectedPresetId,
  onApplyPreset,
  title,
  variant = "buttons",
}: PresetStylesProps) {
  return (
    <div className="flex flex-col gap-3">
      {title ? <span className="text-sm font-semibold">{title}</span> : null}

      {variant === "cards" ? (
        <div className="grid grid-cols-2 gap-3">
          {presets.map((preset) => (
            <Card
              key={preset.id}
              className={cn(
                "cursor-pointer p-3",
                selectedPresetId === preset.id && "ring-2 ring-violet-600",
              )}
              onClick={() => {
                onApplyPreset(preset.id, preset.values);
              }}
            >
              <CardContent className="flex flex-col gap-2 p-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {preset.icon ? <span>{preset.icon}</span> : null}
                    <span className="text-sm font-semibold">
                      {preset.label}
                    </span>
                  </div>
                  {selectedPresetId === preset.id ? (
                    <Badge variant="default" className="text-xs">
                      Active
                    </Badge>
                  ) : null}
                </div>
                {preset.description ? (
                  <span className="text-muted-foreground text-xs">
                    {preset.description}
                  </span>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.id}
              variant={selectedPresetId === preset.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                onApplyPreset(preset.id, preset.values);
              }}
            >
              {preset.icon ? <span>{preset.icon}</span> : null}
              {preset.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
