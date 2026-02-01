"use client";

import {
  Anchor,
  Box,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { categories, patterns } from "@/data/patterns";

export default function HomePage() {
  return (
    <Box p="xl" maw={800}>
      <Box mb="xl">
        <Title order={1} c="gray.9" mb="sm">
          AI Vory
        </Title>
        <Text fz="xl" c="gray.6" mb="lg">
          A multi-framework component library for AI user experience patterns.
          Built with Bootstrap and Ant Design, based on{" "}
          <Anchor
            href="https://www.shapeof.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            shapeof.ai
          </Anchor>{" "}
          patterns.
        </Text>
        <Group gap="sm">
          <Button component={Link} href="/patterns" radius="md">
            Browse Patterns
          </Button>
          <Button
            component={Link}
            href="/pricing"
            variant="default"
            radius="md"
          >
            Pricing
          </Button>
        </Group>
      </Box>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mb="xl">
        <Paper withBorder radius="md" p="md">
          <Text fz="xl" fw={700} c="blue.6">
            {patterns.length}
          </Text>
          <Text fz="sm" c="gray.6">
            AI UX Patterns
          </Text>
        </Paper>
        <Paper withBorder radius="md" p="md">
          <Text fz="xl" fw={700} c="blue.6">
            2
          </Text>
          <Text fz="sm" c="gray.6">
            UI Frameworks
          </Text>
        </Paper>
      </SimpleGrid>

      <Title order={2} c="gray.9" mb="md">
        Categories
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {categories.map((cat) => (
          <Paper
            key={cat.id}
            component={Link}
            href={`/patterns/${cat.id}`}
            withBorder
            radius="md"
            p="md"
            style={{ textDecoration: "none", transition: "all 150ms ease" }}
          >
            <Text fz="xl" mb="xs">
              {cat.icon}
            </Text>
            <Text fw={600} fz="md" c="gray.9" mb={4}>
              {cat.name}
            </Text>
            <Text fz="sm" c="gray.6">
              {cat.description}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
    </Box>
  );
}
