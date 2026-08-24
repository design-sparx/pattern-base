"use client";

import { Divider, Grid, Paper, Stack, Text, Title } from "@mantine/core";

import { categories, getPatternsByCategory } from "@/data/patterns";

export function CategoryIndex() {
  return (
    <Stack gap={0}>
      {categories.map((category, i) => (
        <Stack key={category.id} gap={0}>
          <Paper
            component="a"
            href={`/patterns/${category.id}`}
            py="lg"
            px="md"
            styles={{
              root: {
                "&:hover": {
                  "& .pb-cat-name": {
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
                  className="editorial-display pb-cat-name"
                  fw={500}
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
                  {getPatternsByCategory(category.id).length} patterns
                </Text>
              </Grid.Col>
            </Grid>
          </Paper>
          {i < categories.length - 1 && <Divider />}
        </Stack>
      ))}
    </Stack>
  );
}
