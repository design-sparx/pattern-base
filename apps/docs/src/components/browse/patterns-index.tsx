"use client";

import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

import type {
  CategoryInfo,
  PatternCategory,
  PatternMeta,
} from "@patternbase/core";

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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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

const VISIBLE_ROWS = 3;

type TabValue = "all" | PatternCategory;

interface CategoryGroupProps {
  category: CategoryInfo;
  query: string;
}

function CategoryGroup({ category, query }: CategoryGroupProps) {
  const [expanded, setExpanded] = useState(false);

  const rows = getFilteredPatterns(
    getPatternsByCategory(category.id),
    query,
    "all",
  );
  if (rows.length === 0) return null;

  const Icon = getCategoryIcon(category.id);
  const total = getPatternsByCategory(category.id).length;
  const q = query.trim();
  const gated = q === "";
  const visible = gated ? rows.slice(0, VISIBLE_ROWS) : rows;
  const hidden = gated ? rows.slice(VISIBLE_ROWS) : [];

  return (
    <Card size="sm" variant="interactive" className="rounded-2xl">
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
          {gated
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
        {visible.map((pattern, i) => (
          <PatternIndexRow
            key={pattern.id}
            pattern={pattern}
            index={i}
            query={q}
          />
        ))}
        {hidden.length > 0 && (
          <Collapsible
            open={expanded}
            onOpenChange={setExpanded}
            className="mt-1"
          >
            <CollapsibleContent className="overflow-hidden data-[state=closed]:hidden">
              <div className="flex flex-col gap-1 pt-1">
                {hidden.map((pattern, i) => (
                  <PatternIndexRow
                    key={pattern.id}
                    pattern={pattern}
                    index={visible.length + i}
                    query={q}
                  />
                ))}
              </div>
            </CollapsibleContent>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground hover:bg-muted w-full justify-center gap-1.5 rounded-xl px-3"
              >
                <IconChevronDown
                  className={`text-muted-foreground size-4 transition-transform duration-200 ${
                    expanded ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
                {expanded
                  ? "Show fewer"
                  : `Show all ${String(rows.length)} patterns`}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}

export function PatternsIndex() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<TabValue>("all");

  const scope: PatternMeta[] =
    tab === "all" ? patterns : getPatternsByCategory(tab);
  const filteredCount = getFilteredPatterns(scope, query, "all").length;

  const clearFilters = () => {
    setQuery("");
    setTab("all");
  };

  const activeCategories =
    tab === "all"
      ? categories
      : categories.filter((category) => category.id === tab);

  return (
    <div className="flex min-h-full flex-col">
      <PatternsToolbar
        query={query}
        activeCategory={tab}
        onQueryChange={setQuery}
        onCategoryChange={(value) => {
          setTab(value as TabValue);
        }}
        className="sticky top-2 z-10"
      />

      {filteredCount === 0 ? (
        <Empty className="mt-4 min-h-64 border">
          <EmptyMedia variant="icon">
            <IconSearch />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No patterns found</EmptyTitle>
            <EmptyDescription>Try a different keyword.</EmptyDescription>
          </EmptyHeader>
          <Button size="sm" className="rounded-full" onClick={clearFilters}>
            Clear filters
          </Button>
        </Empty>
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          {activeCategories.map((category) => (
            <CategoryGroup
              key={category.id}
              category={category}
              query={query}
            />
          ))}
        </div>
      )}
    </div>
  );
}
