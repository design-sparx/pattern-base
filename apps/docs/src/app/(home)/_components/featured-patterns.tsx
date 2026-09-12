"use client";

import Link from "next/link";

import type { FeaturedPatternsProps } from "./home-props";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
            className="h-full"
          >
            <Card variant="interactive" className="group h-full">
              <CardHeader>
                <CardAction>
                  <Badge variant="outline" className="font-mono">
                    {category?.name ?? pattern.category}
                  </Badge>
                </CardAction>
                <CardTitle className="text-primary group-hover:underline">
                  {pattern.name}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {pattern.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
