import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCategoryById, getPatternBySlug } from "@/data/patterns";
import { getCategoryColors } from "@/lib/category-colors";

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

  const colors = getCategoryColors(pattern.category);

  return (
    <>
      <Breadcrumb className="app-container py-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/patterns">Patterns</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/patterns/${category.id}`}>{category.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className={`font-semibold ${colors.text}`}>
              {pattern.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </>
  );
}
