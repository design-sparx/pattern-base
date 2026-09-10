import { Pencil, Trash2 } from "lucide-react";

import type { MemoryProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Memory({
  memories,
  onEditMemory,
  onDeleteMemory,
  title = "Memory",
  variant: _variant = "list",
  showTimestamps = false,
}: MemoryProps) {
  const renderEntry = (entry: (typeof memories)[0]) => (
    <Card key={entry.id} className="p-3">
      <CardContent className="p-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs font-medium uppercase">
                {entry.label}
              </span>
              {entry.category ? (
                <Badge variant="secondary">{entry.category}</Badge>
              ) : null}
              {entry.locked ? <Badge variant="outline">Locked</Badge> : null}
            </div>
            <span className="text-sm">{entry.value}</span>
            {showTimestamps && entry.updatedAt ? (
              <span className="text-muted-foreground text-xs">
                {entry.updatedAt.toLocaleString()}
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-1">
            {!entry.locked ? (
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                aria-label="Edit"
                onClick={() => {
                  onEditMemory(entry.id, entry.value);
                }}
              >
                <Pencil className="size-3.5" />
              </Button>
            ) : null}
            {!entry.locked ? (
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive size-7"
                aria-label="Delete"
                onClick={() => {
                  onDeleteMemory(entry.id);
                }}
              >
                <Trash2 className="size-3.5" />
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold">{title}</span>
      <div className="flex flex-col gap-2">{memories.map(renderEntry)}</div>
    </div>
  );
}
