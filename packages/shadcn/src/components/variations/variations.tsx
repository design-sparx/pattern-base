import { Check } from "lucide-react";

import type { VariationsProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function Variations({
  variations,
  selectedId,
  onSelect,
  layout = "grid",
  columns = 2,
}: VariationsProps) {
  if (layout === "tabs") {
    return (
      <Tabs
        value={selectedId ?? variations[0]?.id}
        onValueChange={(key) => {
          if (key) onSelect?.(key);
        }}
      >
        <TabsList>
          {variations.map((v, i) => (
            <TabsTrigger key={v.id} value={v.id}>
              {v.label ?? `Variation ${String(i + 1)}`}
            </TabsTrigger>
          ))}
        </TabsList>
        {variations.map((v) => (
          <TabsContent key={v.id} value={v.id}>
            <span className="text-sm">{v.content}</span>
          </TabsContent>
        ))}
      </Tabs>
    );
  }

  const renderCard = (v: (typeof variations)[0], index: number) => (
    <Card
      key={v.id}
      className={`${selectedId === v.id ? "ring-primary ring-2" : ""} ${onSelect ? "cursor-pointer" : ""}`}
      onClick={() => onSelect?.(v.id)}
    >
      <CardContent className="p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {v.label ??
                (layout === "list"
                  ? `#${String(index + 1)}`
                  : `Variation ${String(index + 1)}`)}
            </Badge>
            {selectedId === v.id ? (
              <Badge>
                <Check className="size-3" />
                Selected
              </Badge>
            ) : null}
          </div>
          <span className="text-sm">{v.content}</span>
        </div>
      </CardContent>
    </Card>
  );

  if (layout === "list") {
    return (
      <div className="flex flex-col gap-2">
        {variations.map((v, i) => renderCard(v, i))}
      </div>
    );
  }

  const gridClass = columns === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className={cn("grid gap-2", gridClass)}>
      {variations.map((v, i) => renderCard(v, i))}
    </div>
  );
}
