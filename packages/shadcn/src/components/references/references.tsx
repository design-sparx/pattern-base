import { X } from "lucide-react";

import type { ReferencesProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function References({
  references,
  onSelectReference,
  onRemoveReference,
  title = "References",
  variant = "list",
  showRelevance = false,
}: ReferencesProps) {
  const renderItem = (ref: (typeof references)[0]) => (
    <Card
      key={ref.id}
      className={`p-3 ${onSelectReference ? "cursor-pointer" : ""} ${ref.selected ? "ring-primary ring-2" : ""}`}
      onClick={() => onSelectReference?.(ref.id)}
    >
      <CardContent className="p-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{ref.title}</span>
              {ref.type ? <Badge variant="secondary">{ref.type}</Badge> : null}
              {ref.selected ? <Badge>Selected</Badge> : null}
            </div>
            {ref.excerpt ? (
              <span className="text-muted-foreground line-clamp-2 text-xs">
                {ref.excerpt}
              </span>
            ) : null}
            {ref.location ? (
              <a
                href={ref.location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-xs underline"
              >
                {ref.location.length > 50
                  ? `${ref.location.substring(0, 50)}...`
                  : ref.location}
              </a>
            ) : null}
            {showRelevance && ref.relevance !== undefined ? (
              <div className="flex items-center gap-2">
                <Progress value={ref.relevance * 100} className="flex-1" />
                <span className="text-muted-foreground text-xs">
                  {Math.round(ref.relevance * 100)}%
                </span>
              </div>
            ) : null}
          </div>
          {onRemoveReference ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              aria-label="Remove"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveReference(ref.id);
              }}
            >
              <X className="size-3" />
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{title}</span>
        <Badge variant="secondary">{references.length}</Badge>
      </div>
      {variant === "cards" ? (
        <div className="grid grid-cols-2 gap-2">
          {references.map(renderItem)}
        </div>
      ) : (
        <div className="flex flex-col gap-2">{references.map(renderItem)}</div>
      )}
    </div>
  );
}
