"use client";

import Link from "next/link";
import type { PatternMeta } from "@patternbase/core";

interface PatternIndexRowProps {
  pattern: PatternMeta;
  index: number;
}

export function PatternIndexRow({ pattern, index }: PatternIndexRowProps) {
  return (
    <Link
      href={`/patterns/${pattern.category}/${pattern.slug}`}
      className="group block border-t border-gray-200 px-4 py-3 no-underline transition-colors hover:bg-violet-50 md:px-6 dark:border-gray-800 dark:hover:bg-violet-950/30"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
        <div className="sm:col-span-2 lg:col-span-1">
          <span
            className="font-mono text-xs text-gray-400 dark:text-gray-500"
            aria-hidden
          >
            {String(index + 1).padStart(3, "0")}
          </span>
        </div>
        <div className="sm:col-span-10 lg:col-span-4">
          <span className="font-medium text-gray-900 transition-colors group-hover:text-violet-600 dark:text-gray-100 dark:group-hover:text-violet-400">
            {pattern.name}
          </span>
        </div>
        <div className="hidden lg:col-span-5 lg:block">
          <span
            className="text-sm text-gray-500 dark:text-gray-400"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
            }}
          >
            {pattern.description}
          </span>
        </div>
        <div className="hidden items-center justify-end gap-1.5 lg:col-span-2 lg:flex">
          {pattern.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
          <span className="font-bold text-violet-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-violet-400">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
