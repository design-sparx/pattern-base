import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryPatternList } from "@/components/browse/category-pattern-list";
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

  return (
    <CategoryPatternList
      category={category}
      patterns={getPatternsByCategory(category.id)}
    />
  );
}
