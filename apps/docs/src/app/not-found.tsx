"use client";

import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconHome, IconSearch } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box p="xl">
      <Stack align="center" gap="md" maw={500} mx="auto" mt="3xl" ta="center">
        <Title
          order={1}
          fz={72}
          fw={800}
          style={{ color: "var(--mantine-color-violet-6)" }}
        >
          404
        </Title>
        <Title order={3}>Page not found</Title>
        <Text c="dimmed">
          The page you are looking for does not exist or has been moved.
        </Text>
        <Group>
          <Button
            component={Link}
            href="/"
            leftSection={<IconHome size={14} />}
          >
            Go home
          </Button>
          <Button
            variant="subtle"
            component={Link}
            href="/patterns/open-input"
            leftSection={<IconSearch size={14} />}
          >
            Browse patterns
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
