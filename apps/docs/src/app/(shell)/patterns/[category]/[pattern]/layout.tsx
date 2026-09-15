import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCategoryById, getPatternBySlug } from "@/data/patterns";

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

  return children;
}
