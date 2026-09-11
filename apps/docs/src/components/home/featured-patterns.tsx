"use client";

import Link from "next/link";

import styles from "@/components/common/editorial.module.css";
import {
  FEATURED_SLUGS,
  getCategoryById,
  getPatternBySlug,
} from "@/data/patterns";
import type { FeaturedPatternsProps } from "@/components/common/home-props";

const DEFAULT_PATTERNS = FEATURED_SLUGS.map(getPatternBySlug).filter(
  (p): p is NonNullable<typeof p> => p !== undefined,
);

export function FeaturedPatterns({
  patterns: patternsProp = DEFAULT_PATTERNS,
  getHref = (slug, category) => `/patterns/${category}/${slug}`,
}: FeaturedPatternsProps) {
  return (
    <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
      {patternsProp.map((pattern) => {
        const category = getCategoryById(pattern.category);
        return (
          <Link
            key={pattern.id}
            href={getHref(pattern.slug, pattern.category)}
            className="group block border-b border-r border-gray-200 p-6 transition-colors hover:bg-violet-50 sm:border-b lg:border-r-0 lg:last:border-r dark:border-gray-800 dark:hover:bg-violet-950/30"
          >
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {category?.name ?? pattern.category}
            </p>
            <h3
              className={`${styles.editorialDisplay} mt-1 font-medium text-violet-600 dark:text-violet-400`}
            >
              {pattern.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {pattern.description}
            </p>
            <p className="mt-3 text-sm font-semibold text-violet-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-violet-400">
              Open pattern →
            </p>
          </Link>
        );
      })}
    </div>
  );
}
