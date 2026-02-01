"use client";

import { Anchor, Box, Button, Group, Text, Title } from "@mantine/core";
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import classes from "./hero.module.css";

export function Hero() {
  return (
    <Box className={classes.root}>
      <Box className={classes.dotGrid} />
      <Box className={classes.content}>
        <Title order={1} className={classes.title} mb="md">
          Build AI interfaces that users trust
        </Title>
        <Text fz="xl" c="dimmed" mb="xl" maw={560}>
          A multi-framework component library for AI UX patterns. Based on{" "}
          <Anchor
            href="https://www.shapeof.ai"
            target="_blank"
            rel="noopener noreferrer"
            fw={500}
          >
            shapeof.ai
          </Anchor>{" "}
          research — built with Bootstrap and Ant Design.
        </Text>
        <Group gap="sm">
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
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="default"
            size="md"
            leftSection={<IconBrandGithub size={16} />}
          >
            GitHub
          </Button>
        </Group>
      </Box>
    </Box>
  );
}
