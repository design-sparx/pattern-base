import {
  IconArrowLeft,
  IconArrowRight,
  IconCompass,
  IconEye,
  IconKeyboard,
  IconLayoutGrid,
  IconSettings,
  IconShield,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RelatedPatternLink } from "@/components/workbench/inspector-pane";
import { Workbench } from "@/components/workbench/workbench";
import { patternExplanations } from "@/data/pattern-explanations";
import { getCategoryById, getPatternBySlug, patterns } from "@/data/patterns";
import { propsData } from "@/data/props-data";
import { codeSnippets } from "@/data/snippet-templates";
import { getCategoryColors } from "@/lib/category-colors";

const categoryIcons: Record<string, React.ElementType> = {
  "prompt-actions": IconKeyboard,
  wayfinders: IconCompass,
  tuners: IconSettings,
  governors: IconEye,
  "trust-builders": IconShield,
};

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
  const Icon = categoryIcons[pattern.category] ?? IconLayoutGrid;

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
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center rounded-md ${colors.chip} p-1`}
          >
            <Icon size={16} className={colors.text} />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {pattern.name}
          </h1>
        </div>
        <p className="mt-2 text-gray-500 lg:text-lg dark:text-gray-400">
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
      <nav
        id="navigation"
        className="mt-8 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-700"
        style={{ scrollMarginTop: 80 }}
      >
        {prev ? (
          <Link
            href={`/patterns/${prev.category}/${prev.slug}`}
            className="flex items-center gap-1 text-sm text-violet-600 no-underline hover:text-violet-700 dark:text-violet-400"
          >
            <IconArrowLeft size={14} />
            {prev.name}
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/patterns/${next.category}/${next.slug}`}
            className="flex items-center gap-1 text-sm text-violet-600 no-underline hover:text-violet-700 dark:text-violet-400"
          >
            {next.name}
            <IconArrowRight size={14} />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
