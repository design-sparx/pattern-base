import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PatternIndexRow } from "@/components/common/pattern-index-row";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  categories,
  getCategoryById,
  getPatternsByCategory,
} from "@/data/patterns";
import { getCategoryIcon } from "@/lib/category-icons";

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
  const Icon = getCategoryIcon(category.id);

  return (
    <div className="flex min-h-full flex-col p-4 md:p-6">
      <Breadcrumb className="px-1">
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

      <Card size="sm" className="mt-4 rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-3">
          <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
            <Icon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl">{category.name}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {categoryPatterns.length} patterns
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 p-2">
          {categoryPatterns.map((pattern, i) => (
            <PatternIndexRow key={pattern.id} pattern={pattern} index={i} />
          ))}
        </CardContent>
        <CardFooter className="border-border border-t px-4 py-3">
          <Link
            href="/patterns"
            className="text-primary inline-flex items-center gap-1 text-sm font-semibold no-underline hover:underline"
          >
            <span aria-hidden>←</span> All patterns
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
