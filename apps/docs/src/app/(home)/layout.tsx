"use client";

import { Anchor, Box, Button, Container, Group, Text } from "@mantine/core";
import Link from "next/link";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Box component="header" bd="0 0 1px var(--mantine-color-default-border)">
        <Container size="xl">
          <Group justify="space-between" h={60} wrap="nowrap">
            <Anchor component={Link} href="/" underline="never">
              <Text fw={700} fz="lg" c="inherit">
                Pattern
                <Text span c="var(--mantine-color-violet-filled)" inherit>
                  Base
                </Text>
              </Text>
            </Anchor>
            <Group gap="lg" visibleFrom="sm">
              <Anchor component={Link} href="/patterns" fz="sm" c="dimmed">
                Patterns
              </Anchor>
              <Anchor href="#about" fz="sm" c="dimmed">
                Origin
              </Anchor>
              <Anchor
                href="https://github.com/design-sparx/patternbase"
                target="_blank"
                fz="sm"
                c="dimmed"
              >
                GitHub ↗
              </Anchor>
            </Group>
            <Anchor href="#install" visibleFrom="sm">
              <Button color="dark" radius="xl" size="compact-sm">
                Get started
              </Button>
            </Anchor>
          </Group>
        </Container>
      </Box>
      <Box component="main" id="main-content">
        {children}
      </Box>
      <Box component="footer" bd="1px 0 0 var(--mantine-color-default-border)">
        <Container size="xl">
          <Group justify="space-between" py="md">
            <Text fz="xs" c="dimmed">
              © PatternBase — MIT licensed
            </Text>
            <Group gap="md">
              <Anchor
                href="https://www.shapeof.ai"
                target="_blank"
                fz="xs"
                c="dimmed"
              >
                shapeof.ai
              </Anchor>
              <Anchor
                href="https://github.com/design-sparx/patternbase"
                target="_blank"
                fz="xs"
                c="dimmed"
              >
                GitHub
              </Anchor>
              <Anchor
                href="https://www.npmjs.com/search?q=%40patternbase"
                target="_blank"
                fz="xs"
                c="dimmed"
              >
                npm
              </Anchor>
            </Group>
          </Group>
        </Container>
      </Box>
    </>
  );
}
