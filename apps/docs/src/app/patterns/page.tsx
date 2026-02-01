import { Box, SimpleGrid, Text, Title } from "@mantine/core";
import { CategoryNav } from "@/components/common/category-nav";
import { PatternCard } from "@/components/common/pattern-card";
import { categories, patterns } from "@/data/patterns";

export default function PatternsPage() {
  return (
    <Box p="xl" maw={1000}>
      <Title order={1} c="gray.9" mb="xs">
        All Patterns
      </Title>
      <Text c="gray.6" mb="lg">
        Browse all {patterns.length} AI UX patterns across {categories.length}{" "}
        categories.
      </Text>

      <CategoryNav categories={categories} />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {patterns.map((p) => (
          <PatternCard key={p.id} pattern={p} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
