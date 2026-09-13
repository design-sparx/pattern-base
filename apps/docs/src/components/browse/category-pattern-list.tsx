"use client";

import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { CategoryInfo, PatternMeta } from "@patternbase/core";

import { PatternsToolbar } from "./patterns-toolbar";

import { PatternIndexRow } from "@/components/common/pattern-index-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getFilteredPatterns } from "@/data/patterns";
import { getCategoryIcon } from "@/lib/category-icons";

interface CategoryPatternListProps {
  category: CategoryInfo;
  patterns: PatternMeta[];
}

export function CategoryPatternList({
  category,
  patterns,
}: CategoryPatternListProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const trimmed = query.trim();
  const Icon = getCategoryIcon(category.id);

  const rows = getFilteredPatterns(patterns, trimmed, "all");
  const hasQuery = trimmed !== "";

  return (
    <div className="flex min-h-full flex-col">
      <PatternsToolbar
        query={query}
        activeCategory={category.id}
        onQueryChange={setQuery}
        onCategoryChange={(value) => {
          router.push(value === "all" ? "/patterns" : `/patterns/${value}`);
        }}
        className="sticky top-2 z-10"
      />

      <Card
        size="sm"
        variant="interactive"
        className="group/card mt-4 rounded-2xl"
      >
        <CardHeader className="flex flex-row items-center gap-3">
          <span className="bg-primary/10 text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300">
            <Icon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <CardTitle className="group-hover/card:text-primary transition-colors duration-300">
              {category.name}
            </CardTitle>
            <CardDescription className="truncate">
              {category.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="tabular-nums">
            {hasQuery
              ? `${String(rows.length)} of ${String(patterns.length)}`
              : `${String(patterns.length)} patterns`}
          </Badge>
        </CardHeader>

        {rows.length === 0 ? (
          <CardContent className="p-2">
            <Empty className="min-h-64">
              <EmptyMedia variant="icon">
                <IconSearch />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle>No patterns found</EmptyTitle>
                <EmptyDescription>
                  Try a different keyword in {category.name}.
                </EmptyDescription>
              </EmptyHeader>
              <Button
                size="sm"
                className="rounded-full"
                onClick={() => {
                  setQuery("");
                }}
              >
                Clear filters
              </Button>
            </Empty>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col gap-1 p-2">
            {rows.map((pattern, i) => (
              <PatternIndexRow
                key={pattern.id}
                pattern={pattern}
                index={i}
                query={trimmed}
              />
            ))}
          </CardContent>
        )}

        <CardFooter className="border-border border-t px-4 py-3">
          <Link
            href="/patterns"
            className="text-primary hover:text-primary/85 inline-flex items-center gap-1 text-sm font-semibold no-underline transition-colors"
          >
            <span aria-hidden>←</span> All patterns
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
