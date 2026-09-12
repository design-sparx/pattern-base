"use client";

import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import styles from "@/components/common/editorial.module.css";

import { PatternIndexRow } from "@/components/common/pattern-index-row";
import {
  Empty,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { categories, getFilteredPatterns, patterns } from "@/data/patterns";

const TAG_FILTERS = [
  "all",
  "prompt",
  "generation",
  "transparency",
  "control",
  "trust",
];

export function PatternsIndex() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");

  const filtered = getFilteredPatterns(patterns, query, tag);

  return (
    <>
      <h1
        className={`${styles.editorialDisplay} text-4xl font-extralight md:text-5xl lg:text-6xl`}
      >
        All patterns
      </h1>
      <p className="text-muted-foreground mt-2 md:text-lg">
        {patterns.length} AI UX patterns across {categories.length} categories.
        Scan by name, filter by intent.
      </p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative w-full md:w-80">
          <IconSearch
            className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2"
            aria-hidden
          />
          <Input
            placeholder="Filter patterns…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="pl-9"
            aria-label="Filter patterns by name or keyword"
          />
        </div>
        <ToggleGroup
          type="single"
          variant="outline"
          value={tag}
          onValueChange={(value) => {
            if (value) setTag(value);
          }}
        >
          {TAG_FILTERS.map((t) => (
            <ToggleGroupItem key={t} value={t} className="capitalize">
              {t}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <p className="text-muted-foreground mt-4 text-sm">
        {filtered.length} pattern{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <Empty className="mt-8 min-h-64">
          <EmptyMedia variant="icon">
            <IconSearch />
          </EmptyMedia>
          <EmptyTitle>No patterns found</EmptyTitle>
          <EmptyDescription>
            Try a different keyword or tag filter.
          </EmptyDescription>
        </Empty>
      ) : (
        categories.map((category) => {
          const rows = filtered.filter((p) => p.category === category.id);
          if (rows.length === 0) return null;
          return (
            <div key={category.id} className="mt-8">
              <div className="mb-3 flex items-center gap-3">
                <h2 className="font-heading text-2xl font-light md:text-3xl">
                  {category.name}
                </h2>
                <span className="text-muted-foreground font-mono text-xs">
                  {rows.length} patterns
                </span>
              </div>
              {rows.map((pattern, i) => (
                <PatternIndexRow key={pattern.id} pattern={pattern} index={i} />
              ))}
            </div>
          );
        })
      )}
    </>
  );
}
