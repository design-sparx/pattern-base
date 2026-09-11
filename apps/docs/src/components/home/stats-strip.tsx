"use client";

import styles from "@/components/common/editorial.module.css";
import type { StatsStripProps } from "@/components/common/home-props";
import { patterns } from "@/data/patterns";

const DEFAULT_ITEMS = [
  { value: String(patterns.length), label: "AI UX Patterns" },
  { value: "3", label: "UI Frameworks" },
  { value: "100%", label: "TypeScript" },
  { value: "MIT", label: "Open Source" },
];

export function StatsStrip({ items = DEFAULT_ITEMS }: StatsStripProps) {
  return (
    <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="border border-gray-200 p-4 md:p-6 dark:border-gray-800"
        >
          <p
            className={`${styles.editorialDisplay} text-2xl font-light md:text-4xl`}
          >
            {item.value}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
