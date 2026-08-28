"use client";

import { Divider, Grid, Paper, Stack, Text, Title } from "@mantine/core";

import styles from "@/components/common/editorial.module.css";
import { categories, getPatternsByCategory } from "@/data/patterns";
import type { CategoryIndexProps } from "@/components/common/home-props";

const DEFAULT_CATEGORIES = categories.map((category) => ({
  id: category.id,
  name: category.name,
  description: category.description,
  count: getPatternsByCategory(category.id).length,
}));

const DEFAULT_GET_HREF = (id: string) => `/patterns/${id}`;

export function CategoryIndex({
  categories: categoriesProp = DEFAULT_CATEGORIES,
  getHref = DEFAULT_GET_HREF,
}: CategoryIndexProps) {
  return (
    <Stack gap={0}>
      {categoriesProp.map((category, i) => (
        <Stack key={category.id} gap={0}>
          <Paper
            component="a"
            href={getHref(category.id)}
            py="lg"
            px="md"
            styles={{
              root: {
                "&:hover": {
                  "& .pbCatName": {
                    color: "var(--mantine-color-violet-filled)",
                  },
                },
              },
            }}
          >
            <Grid columns={12} gutter="md" align="baseline">
              <Grid.Col span={{ base: 2, sm: 1 }}>
                <Text ff="mono" fz="sm" c="dimmed">
                  {String(i + 1).padStart(2, "0")}
                </Text>
              </Grid.Col>
              <Grid.Col span={{ base: 10, sm: 4 }}>
                <Title
                  order={3}
                  className={`${styles.editorialDisplay} pbCatName`}
                  fw={500}
                  c="violet"
                >
                  {category.name}
                </Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 5 }} order={{ base: 3, sm: 2 }}>
                <Text fz="sm" c="dimmed">
                  {category.description}
                </Text>
              </Grid.Col>
              <Grid.Col
                span={{ base: 12, sm: 2 }}
                order={3}
                ta={{ base: "left", sm: "right" }}
              >
                <Text ff="mono" fz="sm" c="dimmed">
                  {category.count} patterns
                </Text>
              </Grid.Col>
            </Grid>
          </Paper>
          {i < categoriesProp.length - 1 && <Divider />}
        </Stack>
      ))}
    </Stack>
  );
}
