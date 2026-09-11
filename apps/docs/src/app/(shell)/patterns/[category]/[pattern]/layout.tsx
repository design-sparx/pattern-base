import { IconChevronRight } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategoryById, getPatternBySlug } from "@/data/patterns";

const categoryColors: Record<string, string> = {
  "prompt-actions": "violet",
  wayfinders: "teal",
  tuners: "orange",
  governors: "blue",
  "trust-builders": "pink",
};

interface LayoutParams {
  params: Promise<{ category: string; pattern: string }>;
}

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { category: categorySlug, pattern: patternSlug } = await params;
  const pattern = getPatternBySlug(patternSlug);
  const category = getCategoryById(categorySlug);

  if (!pattern || !category) return {};

  return {
    title: `${pattern.name} | ${category.name}`,
    description: pattern.description,
  };
}

export default async function PatternDetailLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & LayoutParams>) {
  const { category: categorySlug, pattern: patternSlug } = await params;
  const pattern = getPatternBySlug(patternSlug);
  const category = getCategoryById(categorySlug);

  if (!pattern || !category) notFound();

  const color = categoryColors[pattern.category] ?? "violet";

  return (
    <>
      <nav className="flex items-center gap-1 px-4 pt-4 md:px-6 lg:px-8">
        <Link
          href="/patterns"
          className="text-xs text-gray-400 no-underline hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          Patterns
        </Link>
        <IconChevronRight size={12} className="text-gray-400 opacity-50" />
        <Link
          href={`/patterns/${category.id}`}
          className="text-xs text-gray-400 no-underline hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          {category.name}
        </Link>
        <IconChevronRight size={12} className="text-gray-400 opacity-50" />
        <span
          className={`text-xs font-semibold text-${color}-600 dark:text-${color}-400`}
        >
          {pattern.name}
        </span>
      </nav>
      {children}
    </>
  );
}
