import type { RestructureProps } from "@patternbase/core";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export function Restructure({
  content,
  options,
  onRestructure,
  restructuredContent,
  isProcessing = false,
  showDiff = false,
  title = "Restructure",
  variant = "buttons",
}: RestructureProps) {
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

      {variant === "presets" ? (
        <div className="grid grid-cols-2 gap-2">
          {options.map((option) => (
            <Card
              key={option.id}
              className="cursor-pointer"
              onClick={() => {
                onRestructure(option.id);
              }}
            >
              <CardContent className="flex flex-col gap-0.5 p-3">
                <span className="flex items-center gap-2 text-sm font-medium">
                  {option.icon ? <span>{option.icon}</span> : null}
                  {option.label}
                </span>
                {option.description ? (
                  <span className="text-muted-foreground text-xs">
                    {option.description}
                  </span>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              size="sm"
              disabled={isProcessing}
              onClick={() => {
                onRestructure(option.id);
              }}
            >
              {option.icon ? <span>{option.icon}</span> : null}
              {option.label}
            </Button>
          ))}
        </div>
      )}

      {restructuredContent ? (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs font-medium uppercase">
            {showDiff ? "Changes" : "Result"}
          </span>
          <Card>
            <CardContent className="p-3">
              <p className="text-sm">{restructuredContent}</p>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
