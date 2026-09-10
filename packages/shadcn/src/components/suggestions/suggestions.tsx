import type { SuggestionsProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Suggestions({
  suggestions,
  onSelect,
  columns = 2,
  variant = "card",
}: SuggestionsProps) {
  if (variant === "chip") {
    return (
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <Badge
            key={s.id}
            variant="secondary"
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => {
              onSelect(s);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(s);
              }
            }}
          >
            {s.icon ? <span className="mr-1">{s.icon}</span> : null}
            {s.title}
          </Badge>
        ))}
      </div>
    );
  }

  const gridClass =
    columns === 2
      ? "grid-cols-2"
      : columns === 3
        ? "grid-cols-3"
        : "grid-cols-4";

  return (
    <div className={cn("grid gap-2", gridClass)}>
      {suggestions.map((s) => (
        <Card
          key={s.id}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => {
            onSelect(s);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelect(s);
            }
          }}
        >
          <CardContent className="flex flex-col gap-1 p-3">
            <div className="text-sm font-semibold">
              {s.icon ? <span className="mr-1.5">{s.icon}</span> : null}
              {s.title}
            </div>
            {s.description ? (
              <p className="text-muted-foreground text-xs">{s.description}</p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
