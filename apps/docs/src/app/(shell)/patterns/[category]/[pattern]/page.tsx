import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronRight,
} from "@tabler/icons-react";
import { cn } from "cn";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { RelatedPatternLink } from "@/components/preview/docs-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Workbench } from "@/components/workbench/workbench";
import { patternExplanations } from "@/data/pattern-explanations";
import { getCategoryById, getPatternBySlug, patterns } from "@/data/patterns";
import { propsData } from "@/data/props-data";
import { codeSnippets } from "@/data/snippet-templates";
import { getCategoryColors } from "@/lib/category-colors";
import { getCategoryIcon } from "@/lib/category-icons";

function getRecordEntry<T>(
  record: Record<string, T>,
  key: string,
): T | undefined {
  return record[key];
}

interface PatternPageParams {
  params: Promise<{ category: string; pattern: string }>;
}

export async function generateMetadata({
  params,
}: PatternPageParams): Promise<Metadata> {
  const { category: categorySlug, pattern: patternSlug } = await params;
  const pattern = getPatternBySlug(patternSlug);
  const category = getCategoryById(categorySlug);
  if (!pattern || !category) return {};

  return {
    title: pattern.name,
    description: pattern.description,
    openGraph: {
      title: `${pattern.name} | PatternBase`,
      description: pattern.description,
    },
  };
}

export function generateStaticParams() {
  return patterns.map((p) => ({
    category: p.category,
    pattern: p.slug,
  }));
}

export default async function PatternPage({
  params,
}: Readonly<PatternPageParams>) {
  const { category: categorySlug, pattern: patternSlug } = await params;
  const pattern = getPatternBySlug(patternSlug);
  const category = getCategoryById(categorySlug);

  if (!pattern || !category) notFound();

  const colors = getCategoryColors(pattern.category);
  const Icon = getCategoryIcon(pattern.category);

  const currentIndex = patterns.findIndex((p) => p.id === pattern.id);
  const prev = currentIndex > 0 ? patterns[currentIndex - 1] : null;
  const next =
    currentIndex < patterns.length - 1 ? patterns[currentIndex + 1] : null;

  const snippets = getRecordEntry(codeSnippets, pattern.id);
  const explanation = getRecordEntry(patternExplanations, pattern.id);
  const propDefinitions = getRecordEntry(propsData, pattern.id);

  const relatedLinks: readonly RelatedPatternLink[] = explanation
    ? explanation.relatedPatterns.map((rp) => {
        const related = patterns.find((p) => p.name === rp);
        return related
          ? { label: rp, href: `/patterns/${related.category}/${related.slug}` }
          : { label: rp };
      })
    : [];

  return (
    <div className="flex min-h-full flex-col gap-4">
      {/* Hero */}
      <Card size="sm" variant="interactive" className="rounded-2xl">
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl",
                  colors.chip,
                )}
              >
                <Icon size={22} className={colors.text} />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-xl font-semibold">
                  {pattern.name}
                </CardTitle>
                <CardDescription className="mt-1 max-w-prose">
                  {pattern.description}
                </CardDescription>
              </div>
            </div>
            <Link
              href={`/patterns/${category.id}`}
              className="text-muted-foreground hover:bg-primary/10 hover:text-primary border-border group inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium no-underline transition-colors"
            >
              {category.name}
              <IconChevronRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {pattern.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Workbench: viewer + props/docs below */}
      {!snippets ? (
        <p className="mb-4 text-red-600 dark:text-red-400">
          Snippet generation missing for {`"${pattern.id}"`} — run{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
            pnpm generate-snippets
          </code>
          .
        </p>
      ) : (
        <Workbench
          patternId={pattern.id}
          snippets={snippets}
          explanation={explanation}
          propDefinitions={propDefinitions}
          relatedLinks={relatedLinks}
        />
      )}

      {/* Prev/Next Navigation */}
      <Separator className="mt-2" />
      <nav
        aria-label="Pattern navigation"
        className="flex items-center justify-between gap-2 pt-4"
      >
        {prev ? (
          <Button asChild variant="ghost">
            <Link href={`/patterns/${prev.category}/${prev.slug}`}>
              <IconArrowLeft data-icon="inline-start" />
              {prev.name}
            </Link>
          </Button>
        ) : (
          <span aria-hidden />
        )}
        {next ? (
          <Button asChild variant="ghost">
            <Link href={`/patterns/${next.category}/${next.slug}`}>
              {next.name}
              <IconArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        ) : (
          <span aria-hidden />
        )}
      </nav>
    </div>
  );
}
