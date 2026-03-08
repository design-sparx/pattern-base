"use client";

import {
  Box,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconAdjustments,
  IconArrowUpRight,
  IconCode,
  IconCompass,
  IconCopy,
  IconEye,
  IconKeyboard,
  IconLayoutGrid,
  IconShield,
  IconSparkles,
  IconStack2,
} from "@tabler/icons-react";
import Link from "next/link";

import { Hero } from "@/components/home/hero";
import { categories, getPatternsByCategory, patterns } from "@/data/patterns";

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

const features = [
  {
    icon: IconSparkles,
    color: "violet",
    count: String(patterns.length),
    title: "AI UX Patterns",
    description:
      "Battle-tested interaction patterns sourced from real product research and the shapeof.ai library.",
  },
  {
    icon: IconStack2,
    color: "teal",
    count: "3",
    title: "UI Frameworks",
    description:
      "Full implementations for Bootstrap, Ant Design, and Mantine — choose your stack and drop in components.",
  },
  {
    icon: IconCode,
    color: "blue",
    count: "100%",
    title: "TypeScript Coverage",
    description:
      "Shared prop interfaces across all packages. Full type safety with strict null checks — no guessing.",
  },
  {
    icon: IconCopy,
    color: "orange",
    count: "∞",
    title: "Copy-Paste Ready",
    description:
      "Every pattern ships with a live preview and framework-specific code snippet. See it, ship it.",
  },
];

export default function HomePage() {
  return (
    <Box>
      <Hero />

      {/* Features */}
      <Box px="xl" py="xl">
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md">
          {features.map((f) => (
            <Paper key={f.title} withBorder p="lg" className="feature-card">
              <ThemeIcon variant="light" color={f.color} size="lg" mb="xs">
                <f.icon size={18} />
              </ThemeIcon>
              <Group gap={6} align="baseline" mb={4}>
                <Text fz="xl" fw={800} lh={1}>
                  {f.count}
                </Text>
                <Text fz="sm" fw={600} c="dimmed">
                  {f.title}
                </Text>
              </Group>
              <Text fz="sm" c="dimmed" lh={1.6}>
                {f.description}
              </Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Box>

      {/* Categories */}
      <Box px="xl" pb={80}>
        <Box mb="lg">
          <Title order={2} mb={4}>
            Pattern Categories
          </Title>
          <Text c="dimmed" fz="sm">
            {patterns.length} patterns organized across {categories.length}{" "}
            purposeful categories.
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] ?? IconLayoutGrid;
            const color = categoryColors[cat.id] ?? "violet";
            const catPatterns = getPatternsByCategory(cat.id);
            const count = catPatterns.length;
            const examples = catPatterns.slice(0, 3).map((p) => p.name);

            return (
              <Paper
                key={cat.id}
                component={Link}
                href={`/patterns/${cat.id}`}
                withBorder
                p="lg"
                className="category-card"
                style={{
                  textDecoration: "none",
                  borderLeft: `3px solid var(--mantine-color-${color}-5)`,
                  cursor: "pointer",
                }}
              >
                <Group justify="space-between" mb="xs">
                  <Group gap="sm">
                    <ThemeIcon variant="light" color={color} size="md">
                      <Icon size={16} />
                    </ThemeIcon>
                    <Text
                      fw={600}
                      style={{ color: "var(--mantine-color-text)" }}
                    >
                      {cat.name}
                    </Text>
                  </Group>
                  <IconArrowUpRight size={14} className="category-arrow" />
                </Group>
                <Text fz="sm" c="dimmed" mb="md" lh={1.55}>
                  {cat.description}
                </Text>
                <Stack gap={3}>
                  {examples.map((name) => (
                    <Text key={name} fz="xs" c="dimmed">
                      · {name}
                    </Text>
                  ))}
                  {count > 3 && (
                    <Text fz="xs" c={`${color}.5`} fw={500}>
                      +{count - 3} more patterns
                    </Text>
                  )}
                </Stack>
              </Paper>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
