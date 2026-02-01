"use client";

import {
  Box,
  Group,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconKeyboard,
  IconCompass,
  IconAdjustments,
  IconEye,
  IconShield,
  IconLayoutGrid,
  IconStack2,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { categories, getPatternsByCategory, patterns } from "@/data/patterns";
import { componentRegistry } from "@/lib/registry";

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

export default function HomePage() {
  const SuggestionsPreview = componentRegistry.suggestions?.bootstrap ?? null;

  return (
    <Box>
      <Hero />

      {/* Live Preview */}
      {SuggestionsPreview != null && (
        <Box px="xl" py="xl" maw={900}>
          <Text fz="xs" fw={600} c="dimmed" tt="uppercase" mb="sm" lts={1}>
            Live Preview
          </Text>
          <Paper
            withBorder
            p="xl"
            className="dot-grid-bg"
            style={{ overflow: "hidden" }}
          >
            <SuggestionsPreview />
          </Paper>
        </Box>
      )}

      {/* Stats */}
      <Box px="xl" pb="xl">
        <SimpleGrid cols={{ base: 1, xs: 3 }} spacing="md" maw={900}>
          <Paper withBorder p="md">
            <Group gap="sm">
              <ThemeIcon variant="light" color="violet" size="lg">
                <IconSparkles size={18} />
              </ThemeIcon>
              <Box>
                <Text fz="xl" fw={700}>
                  {patterns.length}
                </Text>
                <Text fz="sm" c="dimmed">
                  AI UX Patterns
                </Text>
              </Box>
            </Group>
          </Paper>
          <Paper withBorder p="md">
            <Group gap="sm">
              <ThemeIcon variant="light" color="violet" size="lg">
                <IconLayoutGrid size={18} />
              </ThemeIcon>
              <Box>
                <Text fz="xl" fw={700}>
                  {categories.length}
                </Text>
                <Text fz="sm" c="dimmed">
                  Categories
                </Text>
              </Box>
            </Group>
          </Paper>
          <Paper withBorder p="md">
            <Group gap="sm">
              <ThemeIcon variant="light" color="violet" size="lg">
                <IconStack2 size={18} />
              </ThemeIcon>
              <Box>
                <Text fz="xl" fw={700}>
                  2
                </Text>
                <Text fz="sm" c="dimmed">
                  UI Frameworks
                </Text>
              </Box>
            </Group>
          </Paper>
        </SimpleGrid>
      </Box>

      {/* Categories */}
      <Box px="xl" pb={60}>
        <Title order={2} mb="md">
          Categories
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md" maw={900}>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] ?? IconLayoutGrid;
            const color = categoryColors[cat.id] ?? "violet";
            const count = getPatternsByCategory(cat.id).length;

            return (
              <Paper
                key={cat.id}
                component={Link}
                href={`/patterns/${cat.id}`}
                withBorder
                p="lg"
                style={{
                  textDecoration: "none",
                  borderLeft: `3px solid var(--mantine-color-${color}-5)`,
                  cursor: "pointer",
                }}
              >
                <Group gap="sm" mb="xs">
                  <ThemeIcon variant="light" color={color} size="md">
                    <Icon size={16} />
                  </ThemeIcon>
                  <Text fw={600} style={{ color: "var(--mantine-color-text)" }}>
                    {cat.name}
                  </Text>
                </Group>
                <Text fz="sm" c="dimmed" mb="sm">
                  {cat.description}
                </Text>
                <Text fz="xs" c="dimmed">
                  {count} pattern{count !== 1 ? "s" : ""}
                </Text>
              </Paper>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
