import { Grid, Paper, Text, Title, UnstyledButton } from "@mantine/core";
import Link from "next/link";

import {
  FEATURED_SLUGS,
  getCategoryById,
  getPatternBySlug,
} from "@/data/patterns";

export function FeaturedPatterns() {
  const featured = FEATURED_SLUGS.map(getPatternBySlug).filter(
    (p): p is NonNullable<typeof p> => p !== undefined,
  );

  return (
    <Grid columns={12} gutter={0}>
      {featured.map((pattern) => {
        const category = getCategoryById(pattern.category);
        return (
          <Grid.Col key={pattern.id} span={{ base: 12, xs: 6, md: 4 }}>
            <Paper p="xl" h="100%" withBorder>
              <UnstyledButton
                component={Link}
                href={`/patterns/${pattern.category}/${pattern.slug}`}
                h="100%"
                w="100%"
                styles={{
                  root: {
                    "& .pb-feature-go": {
                      opacity: 0,
                      transition: "opacity 120ms ease",
                    },
                    "&:hover": {
                      backgroundColor:
                        "light-dark(var(--mantine-color-violet-0), var(--mantine-color-violet-9))",
                      "& .pb-feature-go": { opacity: 1 },
                    },
                  },
                }}
              >
                <Text fz="xs" c="dimmed" className="editorial-kicker">
                  {category?.name ?? pattern.category}
                </Text>
                <Title order={3} className="editorial-display" fw={500} mt={8}>
                  {pattern.name}
                </Title>
                <Text fz="sm" c="dimmed" mt={6} lh={1.55}>
                  {pattern.description}
                </Text>
                <Text
                  className="pb-feature-go"
                  fz="sm"
                  fw={600}
                  c="var(--mantine-color-violet-filled)"
                  mt={14}
                >
                  Open pattern →
                </Text>
              </UnstyledButton>
            </Paper>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
