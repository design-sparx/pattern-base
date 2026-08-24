"use client";

import { Anchor, Box, Container, Grid, Text, Title } from "@mantine/core";

const principles = [
  {
    label: "P—01",
    title: "Multi-framework",
    body: "React Bootstrap, Ant Design, and Mantine implementations behind identical prop interfaces.",
  },
  {
    label: "P—02",
    title: "Copy-paste ready",
    body: "Every pattern ships with a live preview and framework-specific snippet. The code is yours.",
  },
  {
    label: "P—03",
    title: "Fully typed",
    body: "Strict TypeScript across packages so all three frameworks stay behaviorally in sync.",
  },
];

export function OriginManifesto() {
  return (
    <Box id="about" bg="dark.7" c="gray.2" py={{ base: "xl", md: 72 }}>
      <Container size="md">
        <Text fz="xs" c="violet.3" className="editorial-kicker">
          Where it comes from
        </Text>
        <Title
          order={2}
          className="editorial-display"
          fw={350}
          fs="italic"
          mt="md"
          lh={1.25}
        >
          We took shapeof.ai&apos;s taxonomy of AI product UX and turned it into
          production-ready React components.
        </Title>
        <Text c="gray.4" mt="md" lh={1.75}>
          Every pattern is derived from research across leading AI products,
          then built{" "}
          <Anchor href="https://www.shapeof.ai" target="_blank" c="violet.3">
            shapeof.ai
          </Anchor>{" "}
          style on top of your UI library&apos;s primitives — so patterns
          inherit your theme, tokens, and design system instead of fighting
          them.
        </Text>
      </Container>
      <Container size="lg" mt="xl">
        <Grid columns={3} gutter="xl">
          {principles.map((principle) => (
            <Grid.Col key={principle.label} span={{ base: 12, sm: 4 }}>
              <Text ff="mono" fz="xs" c="violet.3">
                {principle.label}
              </Text>
              <Title order={4} mt={6}>
                {principle.title}
              </Title>
              <Text fz="sm" c="gray.5" mt={6} lh={1.6}>
                {principle.body}
              </Text>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
