import type { Metadata } from "next";
import {
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { notFound } from "next/navigation";

import { PatternIndexRow } from "@/components/common/pattern-index-row";
import styles from "@/components/common/editorial.module.css";
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
    <Container size="lg" py="xl">
      <Text fz="sm" c="dimmed">
        <Anchor href="/patterns" c="dimmed" underline="never">
          Patterns
        </Anchor>
        {" / "}
        <Text span c="var(--mantine-color-violet-filled)" fw={500}>
          {category.name}
        </Text>
      </Text>

      <Title
        order={1}
        className={styles.editorialDisplay}
        fw={380}
        fz={{ base: 34, md: 46 }}
        mt="sm"
      >
        {category.name}
      </Title>
      <Text c="dimmed" fz="md" mt="xs">
        {category.description} — {categoryPatterns.length} patterns.
      </Text>

      <Group gap="xl" mt="lg" mb={-1} wrap="nowrap" visibleFrom="sm">
        {categories.map((c) => {
          const active = c.id === category.id;
          return (
            <Anchor
              key={c.id}
              href={`/patterns/${c.id}`}
              fz="sm"
              underline="never"
              c={active ? "inherit" : "dimmed"}
              fw={active ? 600 : 400}
              pb={8}
              bd={
                active
                  ? "2px solid var(--mantine-color-violet-filled)"
                  : "2px solid transparent"
              }
            >
              {c.name} · {getPatternsByCategory(c.id).length}
            </Anchor>
          );
        })}
      </Group>
      <Divider />

      <Box mt="md">
        {categoryPatterns.map((pattern, i) => (
          <PatternIndexRow key={pattern.id} pattern={pattern} index={i} />
        ))}
      </Box>
    </Container>
  );
}
