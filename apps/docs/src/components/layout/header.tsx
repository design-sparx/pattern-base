"use client";

import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  Group,
  Kbd,
  Text,
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
import { usePathname } from "next/navigation";

export function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const pathname = usePathname();

  const navLinks = [
    { href: "/patterns", label: "Patterns" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <Box
      component="header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--header-height)",
        borderBottom: "1px solid var(--mantine-color-default-border)",
        backgroundColor:
          colorScheme === "dark"
            ? "rgba(26, 27, 30, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        paddingInline: 24,
      }}
    >
      <Group gap="xs" align="center">
        <IconSparkles
          size={22}
          style={{ color: "var(--mantine-color-violet-6)" }}
        />
        <Anchor
          component={Link}
          href="/"
          fw={700}
          fz="lg"
          underline="never"
          style={{ color: "var(--mantine-color-text)" }}
        >
          AI Vory
        </Anchor>
        <Badge size="xs" variant="light" color="violet">
          v0.1.0
        </Badge>
      </Group>

      <Group ml="xl" gap={4}>
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              variant="subtle"
              color={isActive ? "violet" : "gray"}
              size="compact-sm"
              fw={isActive ? 600 : 400}
            >
              {link.label}
            </Button>
          );
        })}
      </Group>

      <Group ml="auto" gap="xs">
        <Button
          variant="default"
          size="compact-sm"
          leftSection={<IconSearch size={14} />}
          rightSection={
            <Group gap={4}>
              <Kbd size="xs">Ctrl</Kbd>
              <Kbd size="xs">K</Kbd>
            </Group>
          }
          onClick={spotlight.open}
          style={{ minWidth: 200 }}
        >
          <Text fz="xs" c="dimmed">
            Search...
          </Text>
        </Button>

        <ActionIcon
          variant="default"
          size="lg"
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
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          variant="default"
          size="lg"
          aria-label="GitHub"
        >
          <IconBrandGithub size={18} />
        </ActionIcon>
      </Group>
    </Box>
  );
}
