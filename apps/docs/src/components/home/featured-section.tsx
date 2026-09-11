"use client";

import { useState } from "react";

import { FeaturedPatterns } from "@/components/home/featured-patterns";
import { PatternFilterTabs } from "@/components/home/pattern-filter-tabs";
import { FEATURED_SLUGS, getPatternBySlug } from "@/data/patterns";

const DEFAULT_PATTERNS = FEATURED_SLUGS.map(getPatternBySlug).filter(
  (p): p is NonNullable<typeof p> => p !== undefined,
);

export function FeaturedSection() {
  const [selected, setSelected] = useState("all");

  const visible =
    selected === "all"
      ? DEFAULT_PATTERNS
      : DEFAULT_PATTERNS.filter((pattern) => pattern.category === selected);

  return (
    <>
      <PatternFilterTabs selected={selected} onChange={setSelected} />
      <div className="mt-6">
        <FeaturedPatterns patterns={visible} />
      </div>
    </>
  );
}
