"use client";

import { Box, Group, SimpleGrid, Text, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import { CategoryNav } from "@/components/common/category-nav";
import { PatternCard } from "@/components/common/pattern-card";
import { categories, patterns } from "@/data/patterns";

export default function PatternsPage() {
  const [search, setSearch] = useState("");

  const filtered = patterns.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <Box p="xl">
      <Title order={1} mb="xs">
        All Patterns
      </Title>
      <Text c="dimmed" mb="lg">
        Browse all {patterns.length} AI UX patterns across {categories.length}{" "}
        categories.
      </Text>

      <TextInput
        placeholder="Filter patterns..."
        leftSection={<IconSearch size={16} />}
        mb="lg"
        value={search}
        onChange={(e) => {
          setSearch(e.currentTarget.value);
        }}
      />

      <CategoryNav categories={categories} />

      <Group justify="space-between" mb="sm">
        <Text fz="sm" c="dimmed">
          {filtered.length} pattern{filtered.length !== 1 ? "s" : ""} found
        </Text>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing="md">
        {filtered.map((p) => (
          <PatternCard key={p.id} pattern={p} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
