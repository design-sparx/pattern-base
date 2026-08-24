import type { Metadata } from "next";
import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Text,
  Title,
} from "@mantine/core";

import styles from "@/components/common/editorial.module.css";
import { CategoryIndex } from "@/components/home/category-index";
import { FeaturedPatterns } from "@/components/home/featured-patterns";
import { OriginManifesto } from "@/components/home/origin-manifesto";
import { StatsStrip } from "@/components/home/stats-strip";

export const metadata: Metadata = {
  title: "PatternBase — AI UX Pattern Library",
  description:
    "An open-source React component library codifying 54 AI UX patterns from shapeof.ai into production-ready components for Bootstrap, Ant Design, and Mantine.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Container size="lg" pt={{ base: "xl", md: 80 }} pb="xl">
        <Text
          fz="xs"
          c="var(--mantine-color-violet-filled)"
          className={styles.editorialKicker}
        >
          An open-source component library
        </Text>
        <Title
          order={1}
          className={styles.editorialDisplay}
          fw={350}
          fz={{ base: 38, md: 62 }}
          lh={1.05}
          mt="md"
          maw={760}
        >
          The missing UX patterns for{" "}
          <Text span inherit fs="italic" c="var(--mantine-color-violet-filled)">
            AI products,
          </Text>{" "}
          ready to ship.
        </Title>
        <Text fz="lg" mt="md" maw={520} lh={1.65}>
          Fifty-four interaction patterns distilled from shapeof.ai — each
          implemented for Bootstrap, Ant Design, and Mantine. Study them here,
          copy them into your product.
        </Text>
        <Group gap="md" mt="xl" wrap="nowrap">
          <Anchor href="/patterns">
            <Button color="violet" radius="xl">
              Browse patterns
            </Button>
          </Anchor>
          <Anchor href="#about" c="inherit" fw={600} fz="md" underline="never">
            Read the approach ↓
          </Anchor>
        </Group>
      </Container>

      <Container size="lg" pt="xl">
        {/* Stats */}
        <StatsStrip />
      </Container>

      {/* Featured */}
      <Container size="lg" pt="xl">
        <Group justify="space-between" align="baseline" mb="md">
          <Title order={2} className="editorial-display" fw={450} fz={28}>
            Featured patterns
          </Title>
          <Anchor
            href="/patterns"
            fz="sm"
            fw={600}
            c="var(--mantine-color-violet-filled)"
          >
            View all 54 →
          </Anchor>
        </Group>
        <FeaturedPatterns />
      </Container>

      {/* Category index */}
      <Container size="lg" pt="xl" pb="xl">
        <Title order={2} className="editorial-display" fw={450} fz={28} mb="md">
          Browse by intent
        </Title>
        <CategoryIndex />
      </Container>

      {/* Origin (absorbs /about) */}
      <OriginManifesto />
    </>
  );
}
