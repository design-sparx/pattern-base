"use client";

import { Button, Group } from "@mantine/core";
import Link from "next/link";
import type { CategoryInfo } from "@ai-ui/core";

interface CategoryNavProps {
  categories: CategoryInfo[];
  activeCategoryId?: string;
}

export function CategoryNav({
  categories,
  activeCategoryId,
}: CategoryNavProps) {
  return (
    <Group gap="xs" mb="lg" wrap="wrap">
      <Button
        component={Link}
        href="/patterns"
        size="xs"
        radius="xl"
        variant={!activeCategoryId ? "light" : "default"}
        color={!activeCategoryId ? "violet" : "gray"}
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          component={Link}
          href={`/patterns/${cat.id}`}
          size="xs"
          radius="xl"
          variant={activeCategoryId === cat.id ? "light" : "default"}
          color={activeCategoryId === cat.id ? "violet" : "gray"}
        >
          {cat.name}
        </Button>
      ))}
    </Group>
  );
}
