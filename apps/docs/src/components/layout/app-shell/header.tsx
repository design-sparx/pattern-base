"use client";

import {
  ActionIcon,
  Anchor,
  Badge,
  Group,
  Kbd,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { spotlight } from "@mantine/spotlight";
import {
  IconBrandGithub,
  IconMoon,
  IconSearch,
  IconSparkles,
  IconSun,
} from "@tabler/icons-react";
import Link from "next/link";

export function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group gap="sm">
        <Anchor
          component={Link}
          href="/"
          underline="never"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <IconSparkles
            size={24}
            style={{ color: "var(--mantine-color-violet-6)" }}
            aria-hidden="true"
          />
          <Text fw={700} fz="lg" style={{ color: "var(--mantine-color-text)" }}>
            PatternBase
          </Text>
          <Badge
            size="xs"
            variant="outline"
            color="violet"
            radius="sm"
            styles={{
              root: {
                textTransform: "none",
                fontWeight: 500,
                borderStyle: "dashed",
              },
            }}
          >
            v0.1.0
          </Badge>
        </Anchor>
      </Group>

      <Group gap={8}>
        <UnstyledButton
          onClick={spotlight.open}
          className="header-search"
          aria-label="Search patterns"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: "var(--mantine-radius-md)",
            border: "1px solid var(--mantine-color-default-border)",
            minWidth: 220,
            background:
              colorScheme === "dark"
                ? "var(--mantine-color-dark-6)"
                : "var(--mantine-color-gray-0)",
            cursor: "pointer",
            transition: "border-color 0.15s ease, background 0.15s ease",
          }}
        >
          <IconSearch size={14} color="var(--mantine-color-dimmed)" />
          <Text fz="xs" c="dimmed" style={{ flex: 1 }}>
            Search patterns...
          </Text>
          <Group gap={3}>
            <Kbd size="xs" style={{ fontSize: 10, padding: "1px 5px" }}>
              Ctrl
            </Kbd>
            <Kbd size="xs" style={{ fontSize: 10, padding: "1px 5px" }}>
              K
            </Kbd>
          </Group>
        </UnstyledButton>

        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          radius="md"
          onClick={toggleColorScheme}
          aria-label="Toggle color scheme"
        >
          {colorScheme === "dark" ? (
            <IconSun size={18} />
          ) : (
            <IconMoon size={18} />
          )}
        </ActionIcon>

        <ActionIcon
          component="a"
          href="https://github.com/kelvink96/pattern-base"
          target="_blank"
          rel="noopener noreferrer"
          variant="subtle"
          color="gray"
          size="lg"
          radius="md"
          aria-label="GitHub"
        >
          <IconBrandGithub size={18} />
        </ActionIcon>
      </Group>
    </Group>
  );
}
