import { Anchor, Badge, Box, Group } from "@mantine/core";
import Link from "next/link";

export function Header() {
  return (
    <Box
      component="header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--header-height)",
        borderBottom: "1px solid var(--mantine-color-gray-2)",
        backgroundColor: "white",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        paddingInline: 24,
      }}
    >
      <Anchor
        component={Link}
        href="/"
        fw={700}
        fz="xl"
        c="gray.9"
        underline="never"
      >
        AI Vory
      </Anchor>
      <Badge ml="xs" size="xs" variant="light" color="blue">
        v0.1.0
      </Badge>

      <Group ml="xl" gap="lg">
        <Anchor
          component={Link}
          href="/patterns"
          fz="sm"
          c="gray.6"
          underline="never"
        >
          Patterns
        </Anchor>
        <Anchor
          component={Link}
          href="/pricing"
          fz="sm"
          c="gray.6"
          underline="never"
        >
          Pricing
        </Anchor>
      </Group>

      <Box style={{ marginLeft: "auto" }}>
        <Anchor
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          fz="sm"
          c="gray.5"
          underline="never"
        >
          GitHub
        </Anchor>
      </Box>
    </Box>
  );
}
