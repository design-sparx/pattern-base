"use client";

import { IconSearch } from "@tabler/icons-react";
import { cn } from "cn";
import Link from "next/link";
import { useState } from "react";

import styles from "@/components/common/editorial.module.css";

import { PatternsToolbar } from "@/components/browse/patterns-toolbar";
import { PatternIndexRow } from "@/components/common/pattern-index-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  categories,
  getFilteredPatterns,
  getPatternsByCategory,
  patterns,
} from "@/data/patterns";
import { getCategoryIcon } from "@/lib/category-icons";

export function PatternsIndex() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");

  const filtered = getFilteredPatterns(patterns, query, tag);
  const isIdle = query.trim() === "" && tag === "all";
  const q = query.trim();

  return (
    <div className="flex min-h-full flex-col p-4 md:p-6">
      <header className="px-1">
        <p
          className={cn(
            styles.editorialKicker,
            "text-muted-foreground font-mono text-xs",
          )}
        >
          Pattern library
        </p>
        <h1
          className={`${styles.editorialDisplay} mt-3 text-4xl font-extralight md:text-5xl`}
        >
          All patterns
        </h1>
        <p className="text-muted-foreground mt-2 md:text-lg">
          {patterns.length} AI UX patterns across {categories.length} categories
          — scan by name, filter by intent.
        </p>
      </header>

      <PatternsToolbar
        query={query}
        tag={tag}
        count={filtered.length}
        onQueryChange={setQuery}
        onTagChange={setTag}
        className="sticky top-2 z-10 mt-6"
      />

      {isIdle ? (
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const tileCount = getPatternsByCategory(cat.id).length;
            return (
              <Card
                key={cat.id}
                size="sm"
                variant="interactive"
                className="rounded-2xl"
              >
                <Link
                  href={`/patterns/${cat.id}`}
                  className="group flex size-full flex-col gap-2.5 p-4 no-underline"
                >
                  <span className="flex items-center justify-between">
                    <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-xl">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-muted-foreground font-mono text-xs">
                      {tileCount}
                    </span>
                  </span>
                  <span className="text-foreground text-sm font-medium">
                    {cat.name}
                  </span>
                  <span className="text-muted-foreground text-xs leading-relaxed">
                    {cat.description}
                  </span>
                  <span
                    className="text-primary mt-auto self-end text-sm font-bold opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </Card>
            );
          })}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <Empty className="mt-4 min-h-64 border">
          <EmptyMedia variant="icon">
            <IconSearch />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No patterns found</EmptyTitle>
            <EmptyDescription>
              Try a different keyword or tag filter.
            </EmptyDescription>
          </EmptyHeader>
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => {
              setQuery("");
              setTag("all");
            }}
          >
            Clear filters
          </Button>
        </Empty>
      ) : (
        categories.map((category) => {
          const rows = filtered.filter((p) => p.category === category.id);
          if (rows.length === 0) return null;

          const Icon = getCategoryIcon(category.id);
          const total = getPatternsByCategory(category.id).length;

          return (
            <Card
              key={category.id}
              size="sm"
              variant="interactive"
              className="mt-2 rounded-2xl"
            >
              <CardHeader className="flex flex-row items-center gap-3">
                <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription className="truncate">
                    {category.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="hidden sm:inline-flex">
                  {isIdle
                    ? `${String(total)} patterns`
                    : `${String(rows.length)} of ${String(total)}`}
                </Badge>
                <Link
                  href={`/patterns/${category.id}`}
                  className="text-primary hidden items-center gap-1 text-sm font-semibold no-underline hover:underline md:inline-flex"
                >
                  View all <span aria-hidden>→</span>
                </Link>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 p-2">
                {rows.map((pattern, i) => (
                  <PatternIndexRow
                    key={pattern.id}
                    pattern={pattern}
                    index={i}
                    query={q}
                  />
                ))}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
