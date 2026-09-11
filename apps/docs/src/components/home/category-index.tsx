"use client";

import Link from "next/link";

import type { CategoryIndexProps } from "@/components/common/home-props";
import { Card } from "@/components/ui/card";
import { categories, getPatternsByCategory } from "@/data/patterns";

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
    <div className="flex flex-col gap-3">
      {categoriesProp.map((category, i) => (
        <Link
          key={category.id}
          href={getHref(category.id)}
          className="border-border bg-background hover:border-primary group block rounded-2xl border p-4 transition-all md:p-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
            <div className="sm:col-span-1">
              <span className="text-muted-foreground font-mono text-xs">
                {String(i + 1).padStart(2, "00")}
              </span>
            </div>
            <div className="sm:col-span-4">
              <h3 className="text-primary font-medium">{category.name}</h3>
            </div>
            <div className="sm:col-span-5">
              <p className="text-muted-foreground text-sm">
                {category.description}
              </p>
            </div>
            <div className="text-left sm:col-span-2 sm:text-right">
              <span className="text-muted-foreground font-mono text-xs">
                {category.count} patterns
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
