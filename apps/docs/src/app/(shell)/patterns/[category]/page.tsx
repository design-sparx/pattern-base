import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import styles from "@/components/common/editorial.module.css";

import { PatternIndexRow } from "@/components/common/pattern-index-row";
import {
  categories,
  getCategoryById,
  getPatternsByCategory,
} from "@/data/patterns";

interface CategoryPageParams {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: CategoryPageParams): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);
  if (!category) notFound();

  const categoryPatterns = getPatternsByCategory(category.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link
          href="/patterns"
          className="hover:text-violet-600 dark:hover:text-violet-400"
        >
          Patterns
        </Link>
        <span> / </span>
        <span className="font-medium text-violet-600 dark:text-violet-400">
          {category.name}
        </span>
      </nav>

      <h1
        className={`${styles.editorialDisplay} mt-4 text-4xl font-light md:text-5xl lg:text-6xl`}
      >
        {category.name}
      </h1>
      <p className="mt-2 text-gray-500 md:text-lg dark:text-gray-400">
        {category.description} — {categoryPatterns.length} patterns.
      </p>

      <nav className="mt-6 hidden items-center gap-6 border-b border-gray-200 sm:flex dark:border-gray-800">
        {categories.map((c) => {
          const active = c.id === category.id;
          return (
            <Link
              key={c.id}
              href={`/patterns/${c.id}`}
              className={`border-b-2 pb-2 text-sm transition-colors ${
                active
                  ? "border-violet-600 text-gray-900 dark:text-gray-100"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {c.name} · {getPatternsByCategory(c.id).length}
            </Link>
          );
        })}
      </nav>
      <div className="border-b border-gray-200 sm:hidden dark:border-gray-800" />

      <div className="mt-8">
        {categoryPatterns.map((pattern, i) => (
          <PatternIndexRow key={pattern.id} pattern={pattern} index={i} />
        ))}
      </div>
    </div>
  );
}
