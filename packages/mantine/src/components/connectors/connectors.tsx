import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import type { ConnectorsProps } from "@patternbase/core";

export function Connectors({
  sources,
  onConnect,
  onDisconnect,
  onSync,
  title,
  variant = "list",
}: ConnectorsProps) {
  const statusColor = (status: string) => {
    if (status === "connected") return "green";
    if (status === "syncing") return "blue";
    if (status === "error") return "red";
    return "gray";
  };

  const renderSource = (source: (typeof sources)[0]) => (
    <Card key={source.id} padding="sm" withBorder>
      <Group justify="space-between" align="flex-start">
        <Stack gap={2} style={{ flex: 1 }}>
          <Group gap="xs">
            <Text size="sm" fw={600}>
              {source.name}
            </Text>
            <Badge size="xs" color={statusColor(source.status)} variant="light">
              {source.status}
            </Badge>
            {source.type && (
              <Badge size="xs" variant="light" color="gray">
                {source.type}
              </Badge>
            )}
          </Group>
          {source.description && (
            <Text size="xs" c="dimmed">
              {source.description}
            </Text>
          )}
          {source.lastSyncedAt && (
            <Text size="xs" c="dimmed">
              Last synced: {source.lastSyncedAt.toLocaleString()}
            </Text>
          )}
        </Stack>
        <Group gap="xs">
          {onSync && source.status === "connected" && (
            <Button
              variant="subtle"
              size="compact-xs"
              leftSection={<IconRefresh size={12} />}
              onClick={() => onSync(source.id)}
            >
              Sync
            </Button>
          )}
          {source.status === "disconnected" || source.status === "error" ? (
            <Button
              variant="light"
              size="compact-xs"
              onClick={() => onConnect(source.id)}
            >
              Connect
            </Button>
          ) : (
            <Button
              variant="subtle"
              color="gray"
              size="compact-xs"
              onClick={() => onDisconnect(source.id)}
            >
              Disconnect
            </Button>
          )}
        </Group>
      </Group>
    </Card>
  );

  return (
    <Stack gap="sm">
      {title && (
        <Text fw={600} size="sm">
          {title}
        </Text>
      )}
      {variant === "cards" ? (
        <SimpleGrid cols={2} spacing="sm">
          {sources.map(renderSource)}
        </SimpleGrid>
      ) : (
        <Stack gap="xs">{sources.map(renderSource)}</Stack>
      )}
    </Stack>
  );
}
