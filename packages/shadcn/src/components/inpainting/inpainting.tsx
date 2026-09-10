import { Brush, Loader2 } from "lucide-react";
import { useState } from "react";

import type { InpaintingProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

export function Inpainting({
  content,
  regions,
  onRegionSelect,
  onApply,
  selectedRegionId,
  isProcessing = false,
  prompt = "",
  onPromptChange,
  title = "Inpainting",
  variant = "segment",
}: InpaintingProps) {
  const [localPrompt, setLocalPrompt] = useState(prompt);

  const handlePromptChange = (value: string) => {
    setLocalPrompt(value);
    onPromptChange?.(value);
  };

  const selectedRegion = regions.find((r) => r.id === selectedRegionId);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">{title}</span>
        {isProcessing ? <Spinner className="size-3" /> : null}
      </div>

      <Card>
        <CardContent className="p-3">
          <p className="whitespace-pre-wrap text-sm">{content}</p>
        </CardContent>
      </Card>

      {regions.length > 0 ? (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs font-medium uppercase">
            Regions
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {regions.map((region) => (
              <Badge
                key={region.id}
                variant={
                  selectedRegionId === region.id ? "default" : "secondary"
                }
                className="cursor-pointer"
                onClick={() => {
                  onRegionSelect(region.id);
                }}
              >
                {region.label ?? region.id}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}

      {selectedRegion ? (
        <p className="text-muted-foreground text-xs">
          Selected: <strong>{selectedRegion.label ?? selectedRegion.id}</strong>
        </p>
      ) : null}

      <Textarea
        placeholder="Describe what to replace in the selected region..."
        value={localPrompt}
        onChange={(e) => {
          handlePromptChange(e.currentTarget.value);
        }}
        rows={2}
        disabled={!selectedRegionId}
      />

      <Button
        onClick={() => {
          if (selectedRegionId && localPrompt.trim()) {
            onApply(selectedRegionId, localPrompt.trim());
          }
        }}
        disabled={!selectedRegionId || !localPrompt.trim() || isProcessing}
        size="sm"
        variant={variant === "brush" ? "default" : "outline"}
      >
        {isProcessing ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Brush data-icon="inline-start" className="size-3.5" />
        )}
        Apply
      </Button>
    </div>
  );
}
