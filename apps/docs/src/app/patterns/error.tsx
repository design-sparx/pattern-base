"use client";

import { Box, Button, Code, Stack, Text, Title } from "@mantine/core";
import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import { useEffect } from "react";

interface PatternErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PatternError({
  error,
  reset,
}: Readonly<PatternErrorProps>) {
  useEffect(() => {
    console.error("Pattern page error:", error);
  }, [error]);

  return (
    <Box p="xl">
      <Stack align="center" gap="md" maw={500} mx="auto" mt="xl" ta="center">
        <IconAlertTriangle size={40} color="var(--mantine-color-orange-6)" />
        <Title order={3}>Failed to load pattern</Title>
        <Text c="dimmed">
          This pattern could not be rendered. The component may have an
          incompatible dependency or a rendering error.
        </Text>
        {error.digest && (
          <Code fz="xs" p="xs" w="100%">
            {error.digest}
          </Code>
        )}
        <Button
          variant="light"
          leftSection={<IconRefresh size={14} />}
          onClick={reset}
        >
          Try again
        </Button>
      </Stack>
    </Box>
  );
}
