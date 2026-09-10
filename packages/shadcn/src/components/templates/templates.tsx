import { Search } from "lucide-react";
import { useState } from "react";

import type { TemplatesProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function gridCols(columns: number) {
  if (columns === 2) return "grid-cols-2";
  if (columns === 3) return "grid-cols-3";
  return "grid-cols-4";
}

export function Templates({
  templates,
  onSelect,
  layout = "grid",
  columns = 2,
  searchable = false,
  groupByCategory = false,
}: TemplatesProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? templates.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : templates;

  const gridClass = gridCols(columns);

  const renderCard = (t: (typeof templates)[0]) => (
    <Card
      key={t.id}
      className="cursor-pointer p-3"
      onClick={() => {
        onSelect(t);
      }}
    >
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {t.icon ? <span>{t.icon}</span> : null}
            <span className="text-sm font-semibold">{t.name}</span>
          </div>
          {t.category ? (
            <Badge variant="secondary" className="text-xs">
              {t.category}
            </Badge>
          ) : null}
        </div>
        {t.description ? (
          <span className="text-muted-foreground text-xs">{t.description}</span>
        ) : null}
      </CardContent>
    </Card>
  );

  const grouped = groupByCategory
    ? filtered.reduce<Record<string, typeof filtered>>((acc, t) => {
        const cat = t.category ?? "Other";
        acc[cat] = [...(acc[cat] ?? []), t];
        return acc;
      }, {})
    : null;

  const renderTemplates = () => {
    if (grouped) {
      return (
        <div className="flex flex-col gap-4">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-2">
              <span className="text-muted-foreground text-xs font-medium uppercase">
                {category}
              </span>
              {layout === "grid" ? (
                <div className={cn("grid gap-3", gridClass)}>
                  {items.map(renderCard)}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {items.map(renderCard)}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (layout === "grid") {
      return (
        <div className={cn("grid gap-3", gridClass)}>
          {filtered.map(renderCard)}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">{filtered.map(renderCard)}</div>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {searchable ? (
        <div className="relative">
          <Search className="text-muted-foreground absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2" />
          <Input
            placeholder="Search templates..."
            value={query}
            onChange={(e) => {
              setQuery(e.currentTarget.value);
            }}
            className="h-8 pl-8 text-sm"
          />
        </div>
      ) : null}

      {renderTemplates()}
    </div>
  );
}
