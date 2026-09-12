"use client";

import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import styles from "@/components/common/editorial.module.css";

import { PatternIndexRow } from "@/components/common/pattern-index-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <p className="mt-2 text-gray-500 md:text-lg dark:text-gray-400">
        Fifty-four AI UX patterns across five categories. Scan by name, filter
        by intent.
      </p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative w-full md:w-80">
          <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
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
        <div className="flex flex-wrap gap-2">
          {TAG_FILTERS.map((t) => (
            <Button
              key={t}
              variant={tag === t ? "default" : "outline"}
              size="xs"
              onClick={() => {
                setTag(t);
              }}
              className="capitalize"
            >
              {t}
            </Button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {filtered.length} pattern{filtered.length === 1 ? "" : "s"}
      </p>

      {categories.map((category) => {
        const rows = filtered.filter((p) => p.category === category.id);
        if (rows.length === 0) return null;
        return (
          <div key={category.id} className="mt-8">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="font-serif text-2xl font-light md:text-3xl">
                {category.name}
              </h2>
              <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                {rows.length} patterns
              </span>
            </div>
            {rows.map((pattern, i) => (
              <PatternIndexRow key={pattern.id} pattern={pattern} index={i} />
            ))}
          </div>
        );
      })}
    </>
  );
}
