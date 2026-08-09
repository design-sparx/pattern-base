import { ActionIcon, Badge, Card, Group, Stack, Text } from "@mantine/core";
import { IconLock, IconPencil, IconTrash } from "@tabler/icons-react";
import type { MemoryProps } from "@patternbase/core";

export function Memory({
  memories,
  onEditMemory,
  onDeleteMemory,
  title = "Memory",
  variant: _variant = "list",
  showTimestamps = false,
}: MemoryProps) {
  const renderEntry = (entry: (typeof memories)[0]) => (
    <Card key={entry.id} padding="sm" withBorder>
      <Group justify="space-between" align="flex-start">
        <Stack gap={2} style={{ flex: 1 }}>
          <Group gap="xs">
            <Text size="xs" fw={500} c="dimmed" tt="uppercase">
              {entry.label}
            </Text>
            {entry.category && (
              <Badge size="xs" variant="light">
                {entry.category}
              </Badge>
            )}
            {entry.locked && (
              <Badge
                size="xs"
                variant="light"
                color="gray"
                leftSection={<IconLock size={10} />}
              >
                Locked
              </Badge>
            )}
          </Group>
          <Text size="sm">{entry.value}</Text>
          {showTimestamps && entry.updatedAt && (
            <Text size="xs" c="dimmed">
              {entry.updatedAt.toLocaleString()}
            </Text>
          )}
        </Stack>
        <Group gap="xs">
          {!entry.locked && (
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={() => onEditMemory(entry.id, entry.value)}
            >
              <IconPencil size={14} />
            </ActionIcon>
          )}
          {!entry.locked && (
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              onClick={() => onDeleteMemory(entry.id)}
            >
              <IconTrash size={14} />
            </ActionIcon>
          )}
        </Group>
      </Group>
    </Card>
  );

  return (
    <Stack gap="sm">
      <Text fw={600} size="sm">
        {title}
      </Text>
      <Stack gap="xs">{memories.map(renderEntry)}</Stack>
    </Stack>
  );
}
