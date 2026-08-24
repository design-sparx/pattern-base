import { Grid, Paper, Text, Title } from "@mantine/core";

import { patterns } from "@/data/patterns";

const items = [
  { value: String(patterns.length), label: "AI UX Patterns" },
  { value: "3", label: "UI Frameworks" },
  { value: "100%", label: "TypeScript" },
  { value: "MIT", label: "Open Source" },
];

export function StatsStrip() {
  return (
    <Grid columns={12} gutter={0}>
      {items.map((item) => (
        <Grid.Col key={item.label} span={{ base: 6, md: 3 }}>
          <Paper px="xl" py="lg" withBorder h="100%">
            <Title order={3} className="editorial-display" fw={400} fz="xxxl">
              {item.value}
            </Title>
            <Text fz="xs" tt="uppercase" c="dimmed" mt={4}>
              {item.label}
            </Text>
          </Paper>
        </Grid.Col>
      ))}
    </Grid>
  );
}
