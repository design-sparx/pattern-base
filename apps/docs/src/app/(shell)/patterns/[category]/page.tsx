import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import styles from "@/components/common/editorial.module.css";

import { PatternIndexRow } from "@/components/common/pattern-index-row";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="app-container py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/patterns">Patterns</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1
        className={`${styles.editorialDisplay} mt-4 text-4xl font-light md:text-5xl lg:text-6xl`}
      >
        {category.name}
      </h1>
      <p className="text-muted-foreground mt-2 md:text-lg">
        {category.description} — {categoryPatterns.length} patterns.
      </p>

      <div className="mt-6 hidden sm:block">
        <Tabs value={category.id}>
          <TabsList variant="line">
            {categories.map((c) => (
              <TabsTrigger key={c.id} value={c.id} asChild>
                <Link href={`/patterns/${c.id}`}>
                  {c.name} · {getPatternsByCategory(c.id).length}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-8">
        {categoryPatterns.map((pattern, i) => (
          <PatternIndexRow key={pattern.id} pattern={pattern} index={i} />
        ))}
      </div>
    </div>
  );
}
