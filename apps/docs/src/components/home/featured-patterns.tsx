"use client";

import { Grid, Paper, Text, Title } from "@mantine/core";

import styles from "@/components/common/editorial.module.css";
import {
  FEATURED_SLUGS,
  getCategoryById,
  getPatternBySlug,
} from "@/data/patterns";
import type { FeaturedPatternsProps } from "@/components/common/home-props";

const DEFAULT_PATTERNS = FEATURED_SLUGS.map(getPatternBySlug).filter(
  (p): p is NonNullable<typeof p> => p !== undefined,
);

export function FeaturedPatterns({
  patterns: patternsProp = DEFAULT_PATTERNS,
  getHref = (slug, category) => `/patterns/${category}/${slug}`,
}: FeaturedPatternsProps) {
  return (
    <Grid columns={12} gutter={0}>
      {patternsProp.map((pattern) => {
        const category = getCategoryById(pattern.category);
        return (
          <Grid.Col key={pattern.id} span={{ base: 12, xs: 6, md: 4 }}>
            <Paper
              component="a"
              href={getHref(pattern.slug, pattern.category)}
              p="xl"
              h="100%"
              withBorder
              radius={0}
              styles={{
                root: {
                  "& .pbFeatureGo": {
                    opacity: 0,
                    transition: "opacity 120ms ease",
                  },
                  "&:hover": {
                    backgroundColor:
                      "light-dark(var(--mantine-color-violet-0), var(--mantine-color-violet-9))",
                    "& .pbFeatureGo": { opacity: 1 },
                  },
                },
              }}
            >
              <Text fz="xs" c="dimmed" className={styles.editorialKicker}>
                {category?.name ?? pattern.category}
              </Text>
              <Title
                order={3}
                className={styles.editorialDisplay}
                fw={500}
                mt={8}
                c="violet"
              >
                {pattern.name}
              </Title>
              <Text fz="sm" c="dimmed" mt={6} lh={1.55}>
                {pattern.description}
              </Text>
              <Text
                className="pbFeatureGo"
                fz="sm"
                fw={600}
                c="var(--mantine-color-violet-filled)"
                mt={14}
              >
                Open pattern →
              </Text>
            </Paper>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
