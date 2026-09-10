import type { SampleResponseProps } from "@patternbase/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Wand2, RefreshCw, Check } from "lucide-react";

export function SampleResponse({
  sample,
  prompt,
  onGenerateSample,
  onRegenerateSample,
  onAcceptSample,
  isGenerating = false,
  title = "Sample Response",
  variant = "card",
}: SampleResponseProps) {
  const inner = (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{title}</span>
        {isGenerating ? <Spinner className="size-3.5" /> : null}
      </div>

      {prompt ? (
        <span className="text-muted-foreground text-xs italic">
          &ldquo;{prompt}&rdquo;
        </span>
      ) : null}

      {sample ? (
        <>
          <Textarea value={sample} readOnly rows={3} className="resize-none" />
          <div className="flex items-center gap-2">
            {onRegenerateSample ? (
              <Button
                variant="outline"
                size="sm"
                onClick={onRegenerateSample}
                disabled={isGenerating}
              >
                <RefreshCw className="size-3.5" />
                Regenerate
              </Button>
            ) : null}
            {onAcceptSample ? (
              <Button
                size="sm"
                onClick={onAcceptSample}
                disabled={isGenerating}
              >
                <Check className="size-3.5" />
                Accept
              </Button>
            ) : null}
          </div>
        </>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={onGenerateSample}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Spinner className="size-3.5" />
          ) : (
            <Wand2 className="size-3.5" />
          )}
          Generate Sample
        </Button>
      )}
    </div>
  );

  if (variant === "inline") {
    return <div className="flex flex-col gap-3">{inner}</div>;
  }

  return (
    <Card className="p-3">
      <CardContent className="p-0">{inner}</CardContent>
    </Card>
  );
}
