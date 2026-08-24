"use client";

import {
  Box,
  Group,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import { PatternIndexRow } from "@/components/common/pattern-index-row";
import styles from "@/components/common/editorial.module.css";
import { categories, getFilteredPatterns, patterns } from "@/data/patterns";

const TAG_FILTERS = [
  "all",
  "prompt",
  "generation",
  "transparency",
  "control",
  "trust",
];

export function PatternsIndex() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");

  const filtered = getFilteredPatterns(patterns, query, tag);

  return (
    <>
      <Title
        order={1}
        className={styles.editorialDisplay}
        fw={380}
        fz={{ base: 34, md: 46 }}
      >
        All patterns
      </Title>
      <Text c="dimmed" fz="md" mt="xs">
        Fifty-four AI UX patterns across five categories. Scan by name, filter
        by intent.
      </Text>

      <Group gap="md" mt="lg" mb="xl" align="center">
        <TextInput
          placeholder="Filter patterns…"
          leftSection={<IconSearch size={16} />}
          w={{ base: "100%", sm: 300 }}
          value={query}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          aria-label="Filter patterns by name or keyword"
        />
        <Group gap={6}>
          {TAG_FILTERS.map((t) => (
            <UnstyledButton
              key={t}
              onClick={() => {
                setTag(t);
              }}
              px="sm"
              py={4}
              fz="xs"
              fw={500}
              bd={
                tag === t
                  ? "1px solid var(--mantine-color-text)"
                  : "1px solid var(--mantine-color-default-border)"
              }
              bg={tag === t ? "var(--mantine-color-text)" : "transparent"}
              c={tag === t ? "var(--mantine-color-body)" : "dimmed"}
            >
              {t}
            </UnstyledButton>
          ))}
        </Group>
      </Group>

      <Text fz="sm" c="dimmed" mb="md">
        {filtered.length} pattern{filtered.length === 1 ? "" : "s"}
      </Text>

      {categories.map((category) => {
        const rows = filtered.filter((p) => p.category === category.id);
        if (rows.length === 0) return null;
        return (
          <Box key={category.id} mb="xl">
            <Group gap="sm" align="baseline" mb="xs">
              <Title order={3} className="editorial-display" fw={550} fz="lg">
                {category.name}
              </Title>
              <Text ff="mono" fz="xs" c="dimmed">
                {rows.length} patterns
              </Text>
            </Group>
            {rows.map((pattern, i) => (
              <PatternIndexRow key={pattern.id} pattern={pattern} index={i} />
            ))}
          </Box>
        );
      })}
    </>
  );
}
