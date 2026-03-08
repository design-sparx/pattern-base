import {
  Alert,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Switch,
  Text,
} from "@mantine/core";
import { IconEyeOff } from "@tabler/icons-react";
import type { IncognitoModeProps } from "@ai-ui/core";

export function IncognitoMode({
  enabled,
  onToggle,
  onEndSession,
  title = "Incognito Mode",
  description,
  retentionNotice,
  variant = "card",
}: IncognitoModeProps) {
  const inner = (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Group gap="sm">
          <IconEyeOff size={20} style={{ opacity: 0.7 }} />
          <Stack gap={2}>
            <Group gap="xs">
              <Text fw={600} size="sm">
                {title}
              </Text>
              {enabled && (
                <Badge size="xs" color="green" variant="light">
                  Active
                </Badge>
              )}
            </Group>
            {description && (
              <Text size="xs" c="dimmed">
                {description}
              </Text>
            )}
          </Stack>
        </Group>
        <Switch
          checked={enabled}
          onChange={(e) => onToggle?.(e.currentTarget.checked)}
          size="md"
        />
      </Group>

      {enabled && retentionNotice && (
        <Alert icon={<IconEyeOff size={14} />} color="gray" variant="light">
          <Text size="xs">{retentionNotice}</Text>
        </Alert>
      )}

      {enabled && onEndSession && (
        <Button variant="subtle" color="gray" size="sm" onClick={onEndSession}>
          End Session
        </Button>
      )}
    </Stack>
  );

  if (variant === "banner") {
    return (
      <Alert
        icon={<IconEyeOff size={16} />}
        color={enabled ? "green" : "gray"}
        variant="light"
      >
        {inner}
      </Alert>
    );
  }

  if (variant === "inline") {
    return <Stack gap="sm">{inner}</Stack>;
  }

  return (
    <Card withBorder padding="md">
      {inner}
    </Card>
  );
}
