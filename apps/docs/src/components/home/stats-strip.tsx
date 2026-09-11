"use client";

import type { StatsStripProps } from "@/components/common/home-props";
import { Card, CardContent } from "@/components/ui/card";
import { patterns } from "@/data/patterns";

const DEFAULT_ITEMS = [
  { value: String(patterns.length), label: "AI UX Patterns" },
  { value: "4", label: "UI Frameworks" },
  { value: "100%", label: "TypeScript" },
  { value: "MIT", label: "Open Source" },
];

export function StatsStrip({ items = DEFAULT_ITEMS }: StatsStripProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.label}
          className="border-border bg-background hover:border-primary transition-colors"
        >
          <CardContent>
            <p className="text-primary font-mono text-2xl font-semibold md:text-4xl">
              {item.value}
            </p>
            <p className="text-muted-foreground mt-1 text-xs uppercase tracking-wider">
              {item.label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
