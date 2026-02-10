"use client";

import { Anchor, Box, Group, Text } from "@mantine/core";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";

export function Footer() {
  return (
    <Box
      component="footer"
      py="xl"
      px="xl"
      style={{
        borderTop: "1px solid var(--mantine-color-default-border)",
      }}
    >
      <Group justify="space-between" align="center">
        <Text fz="sm" c="dimmed">
          AI Vory — AI UX Pattern Library
        </Text>
        <Group gap="lg">
          <Anchor
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            fz="sm"
            c="dimmed"
            underline="hover"
          >
            <Group gap={4} align="center">
              <IconBrandGithub size={14} />
              GitHub
            </Group>
          </Anchor>
          <Anchor
            href="https://www.npmjs.com"
            target="_blank"
            rel="noopener noreferrer"
            fz="sm"
            c="dimmed"
            underline="hover"
          >
            <Group gap={4} align="center">
              <IconExternalLink size={14} />
              npm
            </Group>
          </Anchor>
        </Group>
      </Group>
    </Box>
  );
}
