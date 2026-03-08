"use client";

import { Badge, Box, Button, Group, Paper, Text, Title } from "@mantine/core";
import {
  IconArrowRight,
  IconBrandGithub,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";

import classes from "./hero.module.css";

import { componentRegistry } from "@/lib/registry";

const frameworks = [
  { name: "Bootstrap", color: "#7952B3" },
  { name: "Ant Design", color: "#1677ff" },
  { name: "Mantine", color: "#339AF0" },
];

export function Hero() {
  const SuggestionsPreview = componentRegistry.suggestions.mantine;

  return (
    <Box className={classes.root}>
      <Box className={classes.dotGrid} />
      <Box className={classes.orb1} />
      <Box className={classes.orb2} />

      <Box className={classes.inner}>
        {/* Left: content */}
        <Box className={classes.content}>
          <Badge
            variant="light"
            color="violet"
            size="sm"
            leftSection={<IconSparkles size={12} />}
            className={classes.fadeIn1}
            style={{ width: "fit-content" }}
          >
            54 patterns · 5 categories · Open Source
          </Badge>

          <Box className={classes.fadeIn2}>
            <Title order={1} className={classes.title}>
              Build AI interfaces
              <br />
              <span className={classes.titleAccent}>developers trust.</span>
            </Title>
            <Text fz="lg" mt="md" lh={1.65} className={classes.subtitle}>
              A multi-framework component library for AI UX patterns —
              battle-tested interactions built on Bootstrap, Ant Design, and
              Mantine. Drop them into your project and ship with confidence.
            </Text>
          </Box>

          <Group gap="sm" className={classes.fadeIn3}>
            <Button
              component={Link}
              href="/patterns"
              size="md"
              rightSection={<IconArrowRight size={16} />}
            >
              Browse Patterns
            </Button>
            <Button
              component="a"
              href="https://github.com/design-sparx/ai-vory"
              target="_blank"
              rel="noopener noreferrer"
              variant="default"
              size="md"
              leftSection={<IconBrandGithub size={16} />}
            >
              GitHub
            </Button>
          </Group>

          <Box className={classes.fadeIn4}>
            <Text fz="xs" tt="uppercase" fw={600} lts={0.8} mb={8}>
              Works with
            </Text>
            <Group gap="xs">
              {frameworks.map((fw) => (
                <Box key={fw.name} className={classes.frameworkPill}>
                  <Box
                    className={classes.frameworkDot}
                    style={{ background: fw.color }}
                  />
                  <Text fz="sm" fw={500}>
                    {fw.name}
                  </Text>
                </Box>
              ))}
            </Group>
          </Box>
        </Box>

        {/* Right: live preview */}
        <Box className={classes.visual}>
          <Group gap={6} mb={10} align="center">
            <Box className={classes.liveDot} />
            <Text fz="xs" fw={600} tt="uppercase" lts={0.8} c="dimmed">
              Live Preview
            </Text>
          </Group>
          <Paper className={classes.visualCard} withBorder p="lg">
            <SuggestionsPreview />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
