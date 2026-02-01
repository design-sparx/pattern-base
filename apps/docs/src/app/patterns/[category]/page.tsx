import { Box, SimpleGrid, Text, Title } from "@mantine/core";
import { notFound } from "next/navigation";
import { CategoryNav } from "@/components/common/category-nav";
import { PatternCard } from "@/components/common/pattern-card";
import {
  categories,
  getCategoryById,
  getPatternsByCategory,
} from "@/data/patterns";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);
  if (!category) notFound();

  const categoryPatterns = getPatternsByCategory(category.id);

  return (
    <Box p="xl" maw={1000}>
      <Title order={1} c="gray.9" mb="xs">
        {category.icon} {category.name}
      </Title>
      <Text c="gray.6" mb="lg">
        {category.description}
      </Text>

      <CategoryNav categories={categories} activeCategoryId={category.id} />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {categoryPatterns.map((p) => (
          <PatternCard key={p.id} pattern={p} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
