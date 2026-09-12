import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { RelatedPatternLink } from "@/components/workbench/inspector-pane";
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
    <div className="app-container py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center rounded-md ${colors.chip} p-1`}
          >
            <Icon size={16} className={colors.text} />
          </div>
          <h1 className="text-foreground text-2xl font-semibold">
            {pattern.name}
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 lg:text-lg">
          {pattern.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {pattern.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Workbench: preview + inspector */}
      {!snippets ? (
        <p className="mb-6 text-red-600 dark:text-red-400">
          Snippet generation missing for {`"${pattern.id}"`} — run{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-700">
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
      <Separator className="mt-8" />
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
