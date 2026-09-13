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
  CardContent,
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
      <Card variant="interactive" className="overflow-visible">
        <CardContent>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={cn(
                  "border-border flex size-9 shrink-0 items-center justify-center rounded-lg border",
                )}
              >
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-xl font-semibold">
                  {pattern.name}
                </CardTitle>
                <CardDescription className="mt-1 max-w-prose">
                  <div className="flex flex-col gap-2">
                    <p>{pattern.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {pattern.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardDescription>
              </div>
            </div>
            <Link
              href={`/patterns/${category.id}`}
              className="text-primary hover:bg-primary/10 hover:text-primary/85 border-primary/20 group inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium no-underline transition-colors"
            >
              {category.name}
              <IconChevronRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </CardContent>
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
        className="flex items-center justify-between gap-2 pb-4"
      >
        {prev ? (
          <Button asChild variant="outline">
            <Link href={`/patterns/${prev.category}/${prev.slug}`}>
              <IconArrowLeft data-icon="inline-start" />
              {prev.name}
            </Link>
          </Button>
        ) : (
          <span aria-hidden />
        )}
        {next ? (
          <Button asChild variant="outline">
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
