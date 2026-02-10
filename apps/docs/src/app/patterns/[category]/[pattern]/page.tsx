import {
  Badge,
  Box,
  Breadcrumbs,
  Group,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconAdjustments,
  IconArrowLeft,
  IconArrowRight,
  IconChevronRight,
  IconCompass,
  IconEye,
  IconKeyboard,
  IconLayoutGrid,
  IconShield,
} from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentPreview } from "@/components/preview/component-preview";
import { getCategoryById, getPatternBySlug, patterns } from "@/data/patterns";

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

interface PatternPageParams {
  params: Promise<{ category: string; pattern: string }>;
}

export function generateStaticParams() {
  return patterns.map((p) => ({
    category: p.category,
    pattern: p.slug,
  }));
}

export default async function PatternPage({ params }: PatternPageParams) {
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

  return (
    <Box p="xl" maw={1000}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        fz="sm"
        mb="lg"
        separator={
          <IconChevronRight size={12} color="var(--mantine-color-dimmed)" />
        }
      >
        <Link
          href="/patterns"
          style={{
            fontSize: "var(--mantine-font-size-sm)",
            color: "var(--mantine-color-dimmed)",
            textDecoration: "none",
          }}
        >
          Patterns
        </Link>
        <Link
          href={`/patterns/${category.id}`}
          style={{
            fontSize: "var(--mantine-font-size-sm)",
            color: "var(--mantine-color-dimmed)",
            textDecoration: "none",
          }}
        >
          {category.name}
        </Link>
        <Text fz="sm" fw={500}>
          {pattern.name}
        </Text>
      </Breadcrumbs>

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

      {/* Preview */}
      <ComponentPreview patternId={pattern.id} />

      {/* Prev/Next Navigation */}
      <Group
        justify="space-between"
        mt="xl"
        pt="xl"
        style={{ borderTop: "1px solid var(--mantine-color-default-border)" }}
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
