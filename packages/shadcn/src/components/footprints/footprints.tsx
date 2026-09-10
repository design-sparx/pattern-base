import { Activity } from "lucide-react";

import type { FootprintsProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Footprints({
  entries,
  onEntryClick,
  onClear,
  title = "Activity History",
  maxVisible,
  showTimestamps = true,
  variant = "timeline",
}: FootprintsProps) {
  const displayed = maxVisible ? entries.slice(0, maxVisible) : entries;

  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{title}</span>
          {onClear ? (
            <Button variant="ghost" size="sm" className="h-7" onClick={onClear}>
              Clear
            </Button>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          {displayed.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center gap-2 ${onEntryClick ? "cursor-pointer" : ""}`}
              role={onEntryClick ? "button" : undefined}
              tabIndex={onEntryClick ? 0 : undefined}
              onClick={() => onEntryClick?.(entry.id)}
              onKeyDown={(e) => {
                if (onEntryClick && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onEntryClick(entry.id);
                }
              }}
            >
              <span className="text-muted-foreground min-w-[120px] text-xs">
                {showTimestamps ? entry.timestamp.toLocaleTimeString() : ""}
              </span>
              <span className="text-xs">{entry.action}</span>
              {entry.model ? (
                <Badge variant="secondary" className="text-xs">
                  {entry.model}
                </Badge>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{title}</span>
          {onClear ? (
            <Button variant="ghost" size="sm" className="h-7" onClick={onClear}>
              Clear
            </Button>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          {displayed.map((entry) => (
            <Card
              key={entry.id}
              className={`p-2 ${onEntryClick ? "cursor-pointer" : ""}`}
              onClick={() => onEntryClick?.(entry.id)}
            >
              <CardContent className="p-0">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {entry.action}
                      </span>
                      {entry.model ? (
                        <Badge variant="secondary" className="text-xs">
                          {entry.model}
                        </Badge>
                      ) : null}
                    </div>
                    {entry.inputPreview ? (
                      <span className="text-muted-foreground line-clamp-1 text-xs">
                        {entry.inputPreview}
                      </span>
                    ) : null}
                  </div>
                  {showTimestamps ? (
                    <span className="text-muted-foreground text-xs">
                      {entry.timestamp.toLocaleString()}
                    </span>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{title}</span>
        {onClear ? (
          <Button variant="ghost" size="sm" className="h-7" onClick={onClear}>
            Clear
          </Button>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        {displayed.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start gap-2 border-l-2 pl-3"
          >
            <div className="mt-1 flex items-center justify-center">
              <Activity className="size-3" />
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <div
                className={`flex items-center gap-2 ${onEntryClick ? "cursor-pointer" : ""}`}
                role={onEntryClick ? "button" : undefined}
                tabIndex={onEntryClick ? 0 : undefined}
                onClick={() => onEntryClick?.(entry.id)}
                onKeyDown={(e) => {
                  if (onEntryClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onEntryClick(entry.id);
                  }
                }}
              >
                <span className="text-sm font-medium">{entry.action}</span>
                {entry.model ? (
                  <Badge variant="secondary" className="text-xs">
                    {entry.model}
                  </Badge>
                ) : null}
              </div>
              {entry.inputPreview ? (
                <span className="text-muted-foreground line-clamp-1 text-xs">
                  {entry.inputPreview}
                </span>
              ) : null}
              {entry.outputPreview ? (
                <span className="text-muted-foreground line-clamp-1 text-xs">
                  {entry.outputPreview}
                </span>
              ) : null}
              {showTimestamps ? (
                <span className="text-muted-foreground text-xs">
                  {entry.timestamp.toLocaleString()}
                </span>
              ) : null}
              {entry.metadata && Object.keys(entry.metadata).length > 0 ? (
                <Badge variant="secondary" className="mt-1 w-fit text-xs">
                  {Object.keys(entry.metadata).length} details
                </Badge>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
