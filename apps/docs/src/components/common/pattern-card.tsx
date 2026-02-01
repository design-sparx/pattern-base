"use client";

import { Badge, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import {
  IconAdjustments,
  IconCompass,
  IconEye,
  IconKeyboard,
  IconLayoutGrid,
  IconShield,
} from "@tabler/icons-react";
import Link from "next/link";

import type { PatternMeta } from "@ai-ui/core";

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

interface PatternCardProps {
  pattern: PatternMeta;
}

export function PatternCard({ pattern }: PatternCardProps) {
  const Icon = categoryIcons[pattern.category] ?? IconLayoutGrid;
  const color = categoryColors[pattern.category] ?? "violet";

  return (
    <Paper
      component={Link}
      href={`/patterns/${pattern.category}/${pattern.slug}`}
      withBorder
      p="lg"
      style={{
        textDecoration: "none",
        borderTop: `3px solid var(--mantine-color-${color}-5)`,
        cursor: "pointer",
      }}
    >
      <Group gap="xs" mb="xs">
        <ThemeIcon variant="light" color={color} size="sm">
          <Icon size={14} />
        </ThemeIcon>
        <Text fz="xs" c="dimmed" fw={500}>
          {pattern.category.replace("-", " ")}
        </Text>
      </Group>
      <Text
        fw={600}
        fz="md"
        mb={4}
        style={{ color: "var(--mantine-color-text)" }}
      >
        {pattern.name}
      </Text>
      <Text fz="sm" c="dimmed" mb="sm" lineClamp={2}>
        {pattern.description}
      </Text>
      <Group gap={4}>
        {pattern.tags.map((tag) => (
          <Badge key={tag} size="xs" variant="light" color="gray">
            {tag}
          </Badge>
        ))}
      </Group>
    </Paper>
  );
}
