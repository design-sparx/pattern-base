import {
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Timeline,
} from "@mantine/core";
import { IconActivity } from "@tabler/icons-react";
import type { FootprintsProps } from "@patternbase/core";

export function Footprints({
  entries,
  onEntryClick,
  onClear,
  title = "Activity History",
  maxVisible,
  showTimestamps = true,
  variant = "timeline",
}: FootprintsProps) {
  const displayed = maxVisible ? entries.slice(0, maxVisible) : entries;

  return (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Text fw={600} size="sm">
          {title}
        </Text>
        {onClear && (
          <Button
            variant="subtle"
            color="gray"
            size="compact-xs"
            onClick={onClear}
          >
            Clear
          </Button>
        )}
      </Group>

      {variant === "compact" ? (
        <Stack gap={4}>
          {displayed.map((entry) => (
            <Group
              key={entry.id}
              gap="xs"
              style={{ cursor: onEntryClick ? "pointer" : "default" }}
              onClick={() => onEntryClick?.(entry.id)}
            >
              <Text size="xs" c="dimmed" style={{ minWidth: 120 }}>
                {showTimestamps ? entry.timestamp.toLocaleTimeString() : ""}
              </Text>
              <Text size="xs">{entry.action}</Text>
              {entry.model && (
                <Badge size="xs" variant="light">
                  {entry.model}
                </Badge>
              )}
            </Group>
          ))}
        </Stack>
      ) : variant === "list" ? (
        <Stack gap="xs">
          {displayed.map((entry) => (
            <Card
              key={entry.id}
              padding="xs"
              withBorder
              style={{ cursor: onEntryClick ? "pointer" : "default" }}
              onClick={() => onEntryClick?.(entry.id)}
            >
              <Group justify="space-between" align="flex-start">
                <Stack gap={2} style={{ flex: 1 }}>
                  <Group gap="xs">
                    <Text size="sm" fw={500}>
                      {entry.action}
                    </Text>
                    {entry.model && (
                      <Badge size="xs" variant="light">
                        {entry.model}
                      </Badge>
                    )}
                  </Group>
                  {entry.inputPreview && (
                    <Text size="xs" c="dimmed" lineClamp={1}>
                      {entry.inputPreview}
                    </Text>
                  )}
                </Stack>
                {showTimestamps && (
                  <Text size="xs" c="dimmed">
                    {entry.timestamp.toLocaleString()}
                  </Text>
                )}
              </Group>
            </Card>
          ))}
        </Stack>
      ) : (
        <Timeline bulletSize={16} lineWidth={2}>
          {displayed.map((entry) => (
            <Timeline.Item
              key={entry.id}
              bullet={<IconActivity size={10} />}
              title={
                <Group
                  gap="xs"
                  style={{ cursor: onEntryClick ? "pointer" : "default" }}
                  onClick={() => onEntryClick?.(entry.id)}
                >
                  <Text size="sm" fw={500}>
                    {entry.action}
                  </Text>
                  {entry.model && (
                    <Badge size="xs" variant="light">
                      {entry.model}
                    </Badge>
                  )}
                </Group>
              }
            >
              {entry.inputPreview && (
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {entry.inputPreview}
                </Text>
              )}
              {entry.outputPreview && (
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {entry.outputPreview}
                </Text>
              )}
              {showTimestamps && (
                <Text size="xs" c="dimmed">
                  {entry.timestamp.toLocaleString()}
                </Text>
              )}
              {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                <Badge size="xs" variant="light" mt={2}>
                  {Object.keys(entry.metadata).length} details
                </Badge>
              )}
            </Timeline.Item>
          ))}
        </Timeline>
      )}
    </Stack>
  );
}
