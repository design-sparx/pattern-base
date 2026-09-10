import { Sparkles } from "lucide-react";

import type { PromptEnhancerProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function PromptEnhancer({
  prompt,
  enhancedPrompt,
  onEnhance,
  onApply,
  onEnhancedPromptChange,
  isEnhancing = false,
  title,
  showDiff = false,
}: PromptEnhancerProps) {
  return (
    <div className="flex flex-col gap-3">
      {title ? <span className="text-sm font-semibold">{title}</span> : null}

      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs font-medium">
          Original
        </span>
        <Card className="p-3">
          <CardContent className="p-0">
            <span className="text-sm">{prompt}</span>
          </CardContent>
        </Card>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => {
          onEnhance(prompt);
        }}
        disabled={isEnhancing}
      >
        <Sparkles className="size-3.5" />
        Enhance Prompt
      </Button>

      {enhancedPrompt ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs font-medium">
              Enhanced
            </span>
            <Badge variant="secondary" className="text-xs">
              AI Improved
            </Badge>
          </div>
          <Textarea
            value={enhancedPrompt}
            onChange={(e) => {
              onEnhancedPromptChange?.(e.currentTarget.value);
            }}
            rows={2}
            readOnly={!onEnhancedPromptChange}
            className="min-h-16 resize-none"
          />
          {showDiff ? (
            <span className="text-muted-foreground text-xs">
              {prompt.length} → {enhancedPrompt.length} chars
            </span>
          ) : null}
          {onApply ? (
            <Button
              size="sm"
              className="w-fit"
              onClick={() => {
                onApply(enhancedPrompt);
              }}
            >
              Apply
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
