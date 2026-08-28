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

import styles from "@/components/common/editorial.module.css";
import type { OriginManifestoProps } from "@/components/common/home-props";

const DEFAULT_PRINCIPLES = [
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

export function OriginManifesto({
  id = "about",
  kicker = "Where it comes from",
  title = "We took shapeof.ai's taxonomy of AI product UX and turned it into production-ready React components.",
  description = "Every pattern is derived from research across leading AI products, then built",
  shapeofHref = "https://www.shapeof.ai",
  shapeofLabel = "shapeof.ai",
  principles = DEFAULT_PRINCIPLES,
}: OriginManifestoProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Box
      id={id}
      bg={isDark ? "dark.7" : "gray.0"}
      c={isDark ? "gray.2" : "gray.9"}
      py={{ base: "xl", md: 72 }}
    >
      <Container size="lg">
        <Text
          fz="xs"
          c={isDark ? "violet.3" : "violet.6"}
          className={styles.editorialKicker}
        >
          {kicker}
        </Text>
        <Title
          order={2}
          className={styles.editorialDisplay}
          fw={350}
          fs="italic"
          mt="md"
          lh={1.25}
        >
          {title}
        </Title>
        <Text c={isDark ? "gray.4" : "gray.7"} mt="md" lh={1.75}>
          {description}{" "}
          <Anchor
            href={shapeofHref}
            target="_blank"
            c={isDark ? "violet.3" : "violet.6"}
          >
            {shapeofLabel}
          </Anchor>{" "}
          style on top of your UI library&apos;s primitives — so patterns
          inherit your theme, tokens, and design system instead of fighting
          them.
        </Text>
      </Container>
      <Container size="lg" mt="xl">
        <Grid columns={12} gutter="xl">
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
