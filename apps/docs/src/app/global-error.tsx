"use client";

import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconHome, IconRefresh } from "@tabler/icons-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <Box
          p="xl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Stack align="center" gap="md" maw={500}>
            <Title order={1} ta="center" fz={64} fw={800} c="red">
              500
            </Title>
            <Title order={3} ta="center">
              Application error
            </Title>
            <Text c="dimmed" ta="center">
              A critical error occurred in the root layout. Please try
              refreshing the page.
            </Text>
            <Group>
              <Button leftSection={<IconRefresh size={14} />} onClick={reset}>
                Try again
              </Button>
              <Button
                variant="subtle"
                component="a"
                href="/"
                leftSection={<IconHome size={14} />}
              >
                Go home
              </Button>
            </Group>
          </Stack>
        </Box>
      </body>
    </html>
  );
}
