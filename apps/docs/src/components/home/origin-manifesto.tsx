"use client";

import {
  Anchor,
  Box,
  Container,
  Grid,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";

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
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Box
      id="about"
      bg={isDark ? "dark.7" : "gray.0"}
      c={isDark ? "gray.2" : "gray.9"}
      py={{ base: "xl", md: 72 }}
    >
      <Container size="md">
        <Text
          fz="xs"
          c={isDark ? "violet.3" : "violet.6"}
          className="editorial-kicker"
        >
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
        <Text c={isDark ? "gray.4" : "gray.7"} mt="md" lh={1.75}>
          Every pattern is derived from research across leading AI products,
          then built{" "}
          <Anchor
            href="https://www.shapeof.ai"
            target="_blank"
            c={isDark ? "violet.3" : "violet.6"}
          >
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
              <Text ff="mono" fz="xs" c={isDark ? "violet.3" : "violet.6"}>
                {principle.label}
              </Text>
              <Title order={4} mt={6} c={isDark ? "inherit" : "gray.9"}>
                {principle.title}
              </Title>
              <Text fz="sm" c={isDark ? "gray.5" : "gray.7"} mt={6} lh={1.6}>
                {principle.body}
              </Text>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
