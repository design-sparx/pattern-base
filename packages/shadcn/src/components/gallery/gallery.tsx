import type { GalleryProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

function gridCols(columns: number) {
  if (columns === 2) return "grid-cols-2";
  if (columns === 3) return "grid-cols-3";
  return "grid-cols-4";
}

export function Gallery({
  items,
  onSelect,
  onLoadMore,
  columns = 3,
  selectable = false,
  loading = false,
  emptyMessage = "No items to display",
}: GalleryProps) {
  if (items.length === 0 && !loading) {
    return (
      <p className="text-muted-foreground text-center text-sm">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className={cn("grid gap-3", gridCols(columns))}>
        {items.map((item) => (
          <Card
            key={item.id}
            className={cn(
              "p-3",
              typeof onSelect === "function" || selectable
                ? "cursor-pointer"
                : "cursor-default",
              item.selected && "ring-2 ring-violet-600",
            )}
            onClick={() => {
              onSelect?.(item);
            }}
          >
            <CardContent className="flex flex-col gap-2 p-0">
              {item.type === "image" && item.src ? (
                <img
                  src={item.src}
                  alt={item.alt ?? item.title ?? ""}
                  className="h-[120px] w-full rounded-md object-cover"
                />
              ) : null}
              {item.type === "text" && item.content ? (
                <p className="line-clamp-4 text-xs">{item.content}</p>
              ) : null}
              <div className="flex items-center justify-between">
                {item.title ? (
                  <span className="text-xs font-medium">{item.title}</span>
                ) : null}
                {item.selected ? (
                  <Badge variant="default" className="text-xs">
                    Selected
                  </Badge>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : null}

      {onLoadMore && !loading ? (
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" onClick={onLoadMore}>
            Load more
          </Button>
        </div>
      ) : null}
    </div>
  );
}
