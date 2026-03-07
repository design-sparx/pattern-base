import { Box, Group, SimpleGrid, Text, ThemeIcon, Title } from "@mantine/core";
import {
  IconAdjustments,
  IconCompass,
  IconEye,
  IconKeyboard,
  IconLayoutGrid,
  IconShield,
} from "@tabler/icons-react";
import { notFound } from "next/navigation";

import { CategoryNav } from "@/components/common/category-nav";
import { PatternCard } from "@/components/common/pattern-card";
import {
  categories,
  getCategoryById,
  getPatternsByCategory,
} from "@/data/patterns";

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

interface CategoryPageParams {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);
  if (!category) notFound();

  const categoryPatterns = getPatternsByCategory(category.id);
  const Icon = categoryIcons[category.id] ?? IconLayoutGrid;
  const color = categoryColors[category.id] ?? "violet";

  return (
    <Box p="xl">
      <Group gap="sm" mb="xs">
        <ThemeIcon variant="light" color={color} size="lg">
          <Icon size={20} />
        </ThemeIcon>
        <Title order={1}>{category.name}</Title>
      </Group>
      <Text c="dimmed" mb="lg">
        {category.description} &mdash; {categoryPatterns.length} pattern
        {categoryPatterns.length !== 1 ? "s" : ""}
      </Text>

      <CategoryNav categories={categories} activeCategoryId={category.id} />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing="md">
        {categoryPatterns.map((p) => (
          <PatternCard key={p.id} pattern={p} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
