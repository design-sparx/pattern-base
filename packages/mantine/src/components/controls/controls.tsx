import {
  Badge,
  Card,
  Group,
  Stack,
  Switch,
  Text,
  Tooltip,
} from "@mantine/core";
import type { ControlsProps } from "@ai-ui/core";

export function Controls({
  controls,
  onToggleControl,
  title,
  variant = "list",
  showStatus = false,
}: ControlsProps) {
  const statusColor = (status?: string) => {
    if (status === "active") return "green";
    if (status === "restricted") return "orange";
    if (status === "disabled") return "gray";
    return "gray";
  };

  const renderControl = (control: (typeof controls)[0]) => (
    <Card key={control.id} padding="sm" withBorder>
      <Group justify="space-between" align="center">
        <Stack gap={2} style={{ flex: 1 }}>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              {control.label}
            </Text>
            {showStatus && control.status && (
              <Badge
                size="xs"
                color={statusColor(control.status)}
                variant="light"
              >
                {control.status}
              </Badge>
            )}
            {control.locked && (
              <Badge size="xs" variant="light" color="gray">
                Locked
              </Badge>
            )}
          </Group>
          {control.description && (
            <Text size="xs" c="dimmed">
              {control.description}
            </Text>
          )}
        </Stack>
        <Tooltip
          label={
            control.locked
              ? "This control is locked"
              : control.enabled
                ? "Disable"
                : "Enable"
          }
        >
          <Switch
            checked={control.enabled}
            onChange={(e) =>
              !control.locked &&
              onToggleControl(control.id, e.currentTarget.checked)
            }
            disabled={control.locked}
            size="sm"
          />
        </Tooltip>
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
        <Stack gap="xs">{controls.map(renderControl)}</Stack>
      ) : (
        <Stack gap="xs">{controls.map(renderControl)}</Stack>
      )}
    </Stack>
  );
}
