"use client";

import {
  ActionIcon,
  Code,
  CopyButton,
  Group,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface InstallCommandProps {
  command: string;
}

export function InstallCommand({ command }: InstallCommandProps) {
  return (
    <Paper
      withBorder
      p="sm"
      mb="xl"
      style={{ backgroundColor: "var(--mantine-color-default)" }}
    >
      <Group justify="space-between">
        <Group gap="xs">
          <Text fz="xs" fw={600} c="dimmed" tt="uppercase">
            Install
          </Text>
          <Code fz="sm">{command}</Code>
        </Group>
        <CopyButton value={command}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? "Copied!" : "Copy"} withArrow>
              <ActionIcon
                variant="subtle"
                color={copied ? "green" : "gray"}
                size="sm"
                onClick={copy}
              >
                {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
    </Paper>
  );
}
