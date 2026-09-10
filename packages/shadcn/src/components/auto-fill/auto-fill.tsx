import type { AutoFillProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export function AutoFill({
  suggestions,
  onSelect,
  onQueryChange,
  query = "",
  isLoading = false,
  placeholder = "Start typing...",
  maxSuggestions,
  highlightMatch = true,
}: AutoFillProps) {
  const displayed = maxSuggestions
    ? suggestions.slice(0, maxSuggestions)
    : suggestions;

  const highlight = (text: string) => {
    if (!highlightMatch || !query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.substring(0, idx)}
        <mark className="rounded-sm bg-yellow-200">
          {text.substring(idx, idx + query.length)}
        </mark>
        {text.substring(idx + query.length)}
      </>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => {
            onQueryChange?.(e.currentTarget.value);
          }}
          placeholder={placeholder}
          className="pr-8"
        />
        {isLoading ? (
          <Spinner className="absolute right-2 top-1/2 size-3 -translate-y-1/2" />
        ) : null}
      </div>

      {displayed.length > 0 ? (
        <div className="flex flex-col gap-1">
          {displayed.map((s) => (
            <Card
              key={s.id}
              className="cursor-pointer"
              onClick={() => {
                onSelect(s);
              }}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm">{highlight(s.text)}</span>
                  {s.matchScore !== undefined ? (
                    <Badge variant="secondary">
                      {Math.round(s.matchScore * 100)}%
                    </Badge>
                  ) : null}
                </div>
                {s.source ? (
                  <p className="text-muted-foreground text-xs">{s.source}</p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
