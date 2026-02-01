"use client";

import { Badge, Group, Paper, Text } from "@mantine/core";
import Link from "next/link";
import type { PatternMeta } from "@ai-ui/core";

interface PatternCardProps {
  pattern: PatternMeta;
}

export function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Paper
      component={Link}
      href={`/patterns/${pattern.category}/${pattern.slug}`}
      withBorder
      radius="md"
      p="md"
      style={{ textDecoration: "none", transition: "all 150ms ease" }}
    >
      <Text fw={600} fz="md" c="gray.9" mb={4}>
        {pattern.name}
      </Text>
      <Text fz="sm" c="gray.6" mb="sm">
        {pattern.description}
      </Text>
      <Group gap={4}>
        {pattern.tags.map((tag) => (
          <Badge key={tag} size="xs" variant="light" color="gray" radius="sm">
            {tag}
          </Badge>
        ))}
      </Group>
    </Paper>
  );
}
