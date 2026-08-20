"use client";

import {
  Box,
  Button,
  Code,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Readonly<ErrorPageProps>) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <Box p="xl">
      <Paper withBorder p="xl" maw={600} mx="auto" mt="xl">
        <Stack align="center" gap="md">
          <IconAlertTriangle size={48} color="var(--mantine-color-red-6)" />
          <Title order={2} ta="center">
            Something went wrong
          </Title>
          <Text c="dimmed" ta="center">
            An unexpected error occurred while loading this page.
          </Text>
          {error.digest && (
            <Code fz="xs" p="xs" w="100%">
              {error.digest}
            </Code>
          )}
          <Group>
            <Button
              variant="light"
              leftSection={<IconRefresh size={14} />}
              onClick={reset}
            >
              Try again
            </Button>
            <Button variant="subtle" component="a" href="/">
              Go home
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Box>
  );
}
