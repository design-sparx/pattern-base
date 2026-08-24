import { Grid, Group, Paper, Pill, Text } from "@mantine/core";

import type { PatternMeta } from "@patternbase/core";

interface PatternIndexRowProps {
  pattern: PatternMeta;
  index: number;
}

export function PatternIndexRow({ pattern, index }: PatternIndexRowProps) {
  return (
    <Paper
      component="a"
      href={`/patterns/${pattern.category}/${pattern.slug}`}
      w="100%"
      px="md"
      py="sm"
      styles={{
        root: {
          borderTop: "1px solid var(--mantine-color-default-border)",
          "&:hover": {
            backgroundColor:
              "light-dark(var(--mantine-color-violet-0), var(--mantine-color-violet-9))",
            "& .pb-row-name": {
              color: "var(--mantine-color-violet-filled)",
            },
            "& .pb-row-arrow": { opacity: 1 },
          },
          "& .pb-row-arrow": { opacity: 0, transition: "opacity 120ms ease" },
        },
      }}
    >
      <Grid columns={12} gutter="md" align="center">
        <Grid.Col span={{ base: 2, lg: 1 }}>
          <Text ff="mono" fz="xs" c="dimmed" aria-hidden>
            {String(index + 1).padStart(3, "0")}
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 10, lg: 4 }}>
          <Text className="pb-row-name" fw={600} fz="md">
            {pattern.name}
          </Text>
        </Grid.Col>
        <Grid.Col span={5} visibleFrom="lg">
          <Text fz="sm" c="dimmed" truncate>
            {pattern.description}
          </Text>
        </Grid.Col>
        <Grid.Col span={2} visibleFrom="lg">
          <Group gap={4} justify="flex-end" wrap="nowrap">
            {pattern.tags.slice(0, 2).map((tag) => (
              <Pill key={tag} fz="xs" c="dimmed">
                {tag}
              </Pill>
            ))}
            <Text
              className="pb-row-arrow"
              c="var(--mantine-color-violet-filled)"
              fw={700}
            >
              →
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
