import { Badge, Box, Code, Group, Text, ThemeIcon, Title } from "@mantine/core";
import {
  IconAdjustments,
  IconArrowLeft,
  IconArrowRight,
  IconCompass,
  IconEye,
  IconKeyboard,
  IconLayoutGrid,
  IconShield,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Workbench } from "@/components/workbench/workbench";
import { patternExplanations } from "@/data/pattern-explanations";
import { getCategoryById, getPatternBySlug, patterns } from "@/data/patterns";
import { propsData } from "@/data/props-data";
import { codeSnippets } from "@/data/snippet-templates";

const categoryIcons: Record<string, React.ElementType> = {
  "prompt-actions": IconKeyboard,
  wayfinders: IconCompass,
  tuners: IconAdjustments,
  governors: IconEye,
  "trust-builders": IconShield,
};

const categoryColors: Record<string, string> = {
  "prompt-actions": "violet",
  wayfinders: "teal",
  tuners: "orange",
  governors: "blue",
  "trust-builders": "pink",
};

/**
 * Data records are generated files; a missing entry is a regeneration bug,
 * so lookups model absence explicitly even though the generated types do not.
 */
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

  const color = categoryColors[pattern.category] ?? "violet";
  const Icon = categoryIcons[pattern.category] ?? IconLayoutGrid;

  const currentIndex = patterns.findIndex((p) => p.id === pattern.id);
  const prev = currentIndex > 0 ? patterns[currentIndex - 1] : null;
  const next =
    currentIndex < patterns.length - 1 ? patterns[currentIndex + 1] : null;

  const snippets = getRecordEntry(codeSnippets, pattern.id);
  const explanation = getRecordEntry(patternExplanations, pattern.id);

  return (
    <Box p="xl">
      {/* Header */}
      <Box mb="lg">
        <Group gap="sm" mb="xs">
          <ThemeIcon variant="light" color={color} size="md">
            <Icon size={16} />
          </ThemeIcon>
          <Title order={1}>{pattern.name}</Title>
        </Group>
        <Text c="dimmed" fz="lg">
          {pattern.description}
        </Text>
        <Group gap={4} mt="sm">
          {pattern.tags.map((tag) => (
            <Badge key={tag} size="xs" variant="light" color="gray">
              {tag}
            </Badge>
          ))}
        </Group>
      </Box>

      {/* Workbench: preview + inspector */}
      {!snippets ? (
        <Text c="red" mb="xl">
          Snippet generation missing for {`"${pattern.id}"`} — run{" "}
          <Code>pnpm generate-snippets</Code>.
        </Text>
      ) : (
        <Workbench
          patternId={pattern.id}
          snippets={snippets}
          explanation={explanation}
          propDefinitions={propsData[pattern.id]}
        />
      )}

      {/* Prev/Next Navigation */}
      <Group
        id="navigation"
        justify="space-between"
        mt="xl"
        pt="xl"
        style={{
          borderTop: "1px solid var(--mantine-color-default-border)",
          scrollMarginTop: 80,
        }}
      >
        {prev ? (
          <Link
            href={`/patterns/${prev.category}/${prev.slug}`}
            style={{
              fontSize: "var(--mantine-font-size-sm)",
              color: "var(--mantine-color-violet-6)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <IconArrowLeft size={14} />
            {prev.name}
          </Link>
        ) : (
          <Box />
        )}
        {next ? (
          <Link
            href={`/patterns/${next.category}/${next.slug}`}
            style={{
              fontSize: "var(--mantine-font-size-sm)",
              color: "var(--mantine-color-violet-6)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {next.name}
            <IconArrowRight size={14} />
          </Link>
        ) : (
          <Box />
        )}
      </Group>
    </Box>
  );
}
