import type { PromptDetail, PromptDetailsProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function renderDetailValue(detail: PromptDetail) {
  if (detail.type === "badge") {
    return (
      <Badge variant="secondary" className="text-xs">
        {detail.value}
      </Badge>
    );
  }
  if (detail.type === "link" && detail.url) {
    return (
      <a
        href={detail.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary text-xs underline-offset-4 hover:underline"
      >
        {detail.value}
      </a>
    );
  }
  return <span className="text-xs">{detail.value}</span>;
}

export function PromptDetails({
  prompt,
  details,
  timestamp,
  model,
  tokenCount,
  variant = "card",
}: PromptDetailsProps) {
  const inner = (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Prompt Details</span>
        <div className="flex items-center gap-2">
          {model ? <Badge variant="secondary">{model}</Badge> : null}
          {tokenCount !== undefined ? (
            <Badge variant="secondary">{tokenCount} tokens</Badge>
          ) : null}
        </div>
      </div>

      <p className="text-muted-foreground text-sm italic">
        &ldquo;{prompt}&rdquo;
      </p>

      {timestamp ? (
        <span className="text-muted-foreground text-xs">
          {timestamp.toLocaleString()}
        </span>
      ) : null}

      {details.length > 0 ? (
        <div className="flex flex-col gap-1">
          {details.map((detail) => (
            <div key={detail.id} className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                {detail.label}
              </span>
              {renderDetailValue(detail)}
            </div>
          ))}
        </div>
      ) : null}
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
