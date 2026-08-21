import type { Metadata } from "next";
import {
  Anchor,
  Box,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandNpm,
  IconCode,
  IconComponents,
  IconLayoutGrid,
  IconLock,
  IconPuzzle,
  IconRocket,
} from "@tabler/icons-react";

const pillars = [
  {
    icon: IconLayoutGrid,
    title: "54 AI UX Patterns",
    description:
      "A comprehensive library of interaction patterns derived from real-world AI products — covering prompting, wayfinding, tuning, governance, and trust.",
  },
  {
    icon: IconComponents,
    title: "Multi-Framework",
    description:
      "Implementations for React Bootstrap, Ant Design, and Mantine UI. Install your preferred UI library and drop in the AI-specific components.",
  },
  {
    icon: IconCode,
    title: "Copy-Paste Ready",
    description:
      "Every pattern ships with a live preview and copy-ready code snippet. No abstraction lock-in — the code is yours to adapt.",
  },
  {
    icon: IconPuzzle,
    title: "Composable by Design",
    description:
      "Patterns are built on top of your existing UI library primitives, so they inherit your theme, tokens, and design system out of the box.",
  },
  {
    icon: IconLock,
    title: "Fully Typed",
    description:
      "Strict TypeScript throughout. Shared prop interfaces live in @patternbase/core so all three framework packages stay in sync.",
  },
  {
    icon: IconRocket,
    title: "Open Source",
    description:
      "MIT licensed. Built in the open, contributions welcome. The goal is a community-driven reference for AI UX engineering.",
  },
];

const patternCategories = [
  {
    name: "Prompt Actions",
    count: 13,
    description: "Components that let users shape and steer AI generation.",
  },
  {
    name: "Wayfinders",
    count: 8,
    description: "Patterns that guide users toward good prompts and outputs.",
  },
  {
    name: "Tuners",
    count: 10,
    description: "Controls for model parameters, tone, style, and attachments.",
  },
  {
    name: "Governors",
    count: 14,
    description:
      "Transparency and control: citations, drafts, branches, memory.",
  },
  {
    name: "Trust Builders",
    count: 9,
    description: "Consent, disclosure, watermarking, and data ownership.",
  },
];

export const metadata: Metadata = {
  title: "About",
  description:
    "PatternBase is an open-source React component library codifying 54 AI UX patterns from shapeof.ai into production-ready components for Bootstrap, Ant Design, and Mantine.",
};

export default function AboutPage() {
  return (
    <Box p="xl">
      {/* Hero */}
      <Title order={1} mb="sm">
        About PatternBase
      </Title>
      <Text c="dimmed" fz="lg" mb="xl">
        PatternBase is an open-source React component library for building AI
        user interfaces. It codifies the UX patterns that make AI products feel
        intuitive, trustworthy, and genuinely useful.
      </Text>

      {/* Origin */}
      <Title order={2} fz="xl" mb="sm">
        Where it comes from
      </Title>
      <Text c="dimmed" mb="xl">
        The patterns in PatternBase are derived from{" "}
        <Anchor href="https://www.shapeof.ai" target="_blank" c="violet">
          shapeof.ai
        </Anchor>
        , a research project cataloguing UX patterns across leading AI products.
        We took that taxonomy and turned it into production-ready React
        components; so teams can implement well-studied patterns instead of
        reinventing them.
      </Text>

      {/* Pillars */}
      <Title order={2} fz="xl" mb="md">
        Core principles
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md" mb="xl">
        {pillars.map((p) => (
          <Card key={p.title} withBorder p="md" radius="md">
            <Group gap="sm" mb="xs" align="flex-start">
              <ThemeIcon variant="light" color="violet" size="md" mt={2}>
                <p.icon size={16} />
              </ThemeIcon>
              <Text fw={600} fz="sm">
                {p.title}
              </Text>
            </Group>
            <Text fz="sm" c="dimmed">
              {p.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      {/* Pattern categories */}
      <Title order={2} fz="xl" mb="md">
        Pattern categories
      </Title>
      <Stack gap="sm" mb="xl">
        {patternCategories.map((cat) => (
          <Group key={cat.name} gap="md" align="flex-start">
            <Text fw={600} fz="sm" w={150} style={{ flexShrink: 0 }}>
              {cat.name}
              <Text component="span" c="dimmed" fw={400}>
                {" "}
                ({cat.count})
              </Text>
            </Text>
            <Text fz="sm" c="dimmed">
              {cat.description}
            </Text>
          </Group>
        ))}
      </Stack>

      {/* Tech stack */}
      <Title order={2} fz="xl" mb="sm">
        Tech stack
      </Title>
      <Text c="dimmed" mb="md" maw={680}>
        The monorepo is built with{" "}
        <Anchor href="https://turbo.build/repo" target="_blank" c="violet">
          Turborepo
        </Anchor>{" "}
        and pnpm workspaces. Packages are compiled with{" "}
        <Anchor href="https://tsup.egoist.dev" target="_blank" c="violet">
          tsup
        </Anchor>{" "}
        to both CJS and ESM. The docs site runs on Next.js 16 with Mantine UI.
        Tests use Vitest with{" "}
        <Anchor
          href="https://testing-library.com/docs/react-testing-library/intro"
          target="_blank"
          c="violet"
        >
          @testing-library/react
        </Anchor>
        .
      </Text>

      {/* Links */}
      <Title order={2} fz="xl" mb="md">
        Links
      </Title>
      <Group gap="md">
        <Anchor
          href="https://github.com/design-sparx/patternbase"
          target="_blank"
          c="violet"
        >
          <Group gap="xs">
            <IconBrandGithub size={16} />
            <Text fz="sm">GitHub</Text>
          </Group>
        </Anchor>
        <Anchor
          href="https://www.npmjs.com/search?q=%40patternbase"
          target="_blank"
          c="violet"
        >
          <Group gap="xs">
            <IconBrandNpm size={16} />
            <Text fz="sm">npm</Text>
          </Group>
        </Anchor>
        <Anchor href="https://www.shapeof.ai" target="_blank" c="violet">
          <Text fz="sm">shapeof.ai (pattern source)</Text>
        </Anchor>
      </Group>
    </Box>
  );
}
