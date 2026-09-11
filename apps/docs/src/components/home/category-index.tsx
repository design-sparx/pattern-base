"use client";

import Link from "next/link";

import styles from "@/components/common/editorial.module.css";
import { categories, getPatternsByCategory } from "@/data/patterns";
import type { CategoryIndexProps } from "@/components/common/home-props";

const DEFAULT_CATEGORIES = categories.map((category) => ({
  id: category.id,
  name: category.name,
  description: category.description,
  count: getPatternsByCategory(category.id).length,
}));

const DEFAULT_GET_HREF = (id: string) => `/patterns/${id}`;

export function CategoryIndex({
  categories: categoriesProp = DEFAULT_CATEGORIES,
  getHref = DEFAULT_GET_HREF,
}: CategoryIndexProps) {
  return (
    <div className="flex flex-col">
      {categoriesProp.map((category, i) => (
        <div key={category.id} className="flex flex-col">
          <Link
            href={getHref(category.id)}
            className="block border-b border-gray-200 px-4 py-4 transition-colors hover:bg-gray-50 md:px-6 dark:border-gray-800 dark:hover:bg-gray-800/50"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
              <div className="sm:col-span-1">
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                  {String(i + 1).padStart(2, "00")}
                </span>
              </div>
              <div className="sm:col-span-4">
                <h3
                  className={`${styles.editorialDisplay} font-medium text-violet-600 dark:text-violet-400`}
                >
                  {category.name}
                </h3>
              </div>
              <div className="sm:col-span-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
              <div className="text-left sm:col-span-2 sm:text-right">
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                  {category.count} patterns
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
