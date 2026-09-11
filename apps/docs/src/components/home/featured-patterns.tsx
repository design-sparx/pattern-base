"use client";

import Link from "next/link";

import type { FeaturedPatternsProps } from "@/components/common/home-props";
import { Badge } from "@/components/ui/badge";
import {
  FEATURED_SLUGS,
  getCategoryById,
  getPatternBySlug,
} from "@/data/patterns";

const DEFAULT_PATTERNS = FEATURED_SLUGS.map(getPatternBySlug).filter(
  (p): p is NonNullable<typeof p> => p !== undefined,
);

export function FeaturedPatterns({
  patterns: patternsProp = DEFAULT_PATTERNS,
  getHref = (slug, category) => `/patterns/${category}/${slug}`,
}: FeaturedPatternsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {patternsProp.map((pattern) => {
        const category = getCategoryById(pattern.category);
        return (
          <Link
            key={pattern.id}
            href={getHref(pattern.slug, pattern.category)}
            className="border-border bg-background hover:border-primary group block rounded-2xl border p-5 transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-mono">
                {category?.name ?? pattern.category}
              </Badge>
            </div>
            <h3 className="text-primary mt-3 font-semibold">{pattern.name}</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              {pattern.description}
            </p>
            <div className="border-border bg-muted text-muted-foreground mt-3 rounded-lg border p-2 font-mono text-[11px]">
              &lt;
              {pattern.slug
                .split("-")
                .map((w) => w[0].toUpperCase() + w.slice(1))
                .join("")}{" "}
              /&gt;
            </div>
          </Link>
        );
      })}
    </div>
  );
}
