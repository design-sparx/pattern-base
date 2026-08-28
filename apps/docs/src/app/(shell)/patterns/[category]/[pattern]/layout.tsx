import { Box, Group, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategoryById, getPatternBySlug } from "@/data/patterns";

const categoryColors: Record<string, string> = {
  "prompt-actions": "violet",
  wayfinders: "teal",
  tuners: "orange",
  governors: "blue",
  "trust-builders": "pink",
};

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

  const color = categoryColors[pattern.category] ?? "violet";

  return (
    <>
      <Box px="xl" pt="xl">
        <Group gap={6}>
          <Link
            href="/patterns"
            style={{
              fontSize: "var(--mantine-font-size-xs)",
              color: "var(--mantine-color-dimmed)",
              textDecoration: "none",
            }}
          >
            Patterns
          </Link>
          <IconChevronRight
            size={12}
            color="var(--mantine-color-dimmed)"
            style={{ opacity: 0.5 }}
          />
          <Link
            href={`/patterns/${category.id}`}
            style={{
              fontSize: "var(--mantine-font-size-xs)",
              color: "var(--mantine-color-dimmed)",
              textDecoration: "none",
            }}
          >
            {category.name}
          </Link>
          <IconChevronRight
            size={12}
            color="var(--mantine-color-dimmed)"
            style={{ opacity: 0.5 }}
          />
          <Text fz="xs" fw={600} c={color}>
            {pattern.name}
          </Text>
        </Group>
      </Box>
      {children}
    </>
  );
}
