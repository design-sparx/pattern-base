import {
  Badge,
  Card,
  Group,
  Stack,
  Switch,
  Text,
  Tooltip,
} from "@mantine/core";

import type { ControlsProps } from "@patternbase/core";

export function Controls({
  controls,
  onToggleControl,
  title,
  variant = "list",
  showStatus = true,
}: ControlsProps) {
  const statusColor = (status?: string) => {
    if (status === "active") return "green";
    if (status === "restricted") return "orange";
    if (status === "disabled") return "gray";
    return "gray";
  };

  const renderControl = (control: (typeof controls)[0]) => {
    let switchLabel = "Enable";
    if (control.locked) {
      switchLabel = "This control is locked";
    } else if (control.enabled) {
      switchLabel = "Disable";
    }

    return (
      <Card key={control.id} padding="sm" withBorder>
        <Group justify="space-between" align="center">
          <Stack gap={2} style={{ flex: 1 }}>
            <Group gap="xs">
              <Text size="sm" fw={500}>
                {control.label}
              </Text>
              {showStatus && control.status ? (
                <Badge
                  size="xs"
                  color={statusColor(control.status)}
                  variant="light"
                >
                  {control.status}
                </Badge>
              ) : null}
              {control.locked ? (
                <Badge size="xs" variant="light" color="gray">
                  Locked
                </Badge>
              ) : null}
            </Group>
            {control.description ? (
              <Text size="xs" c="dimmed">
                {control.description}
              </Text>
            ) : null}
          </Stack>
          <Tooltip label={switchLabel}>
            <Switch
              checked={control.enabled}
              onChange={(e) => {
                if (!control.locked) {
                  onToggleControl(control.id, e.currentTarget.checked);
                }
              }}
              disabled={control.locked}
              size="sm"
            />
          </Tooltip>
        </Group>
      </Card>
    );
  };

  return (
    <Stack gap="sm">
      {title ? (
        <Text fw={600} size="sm">
          {title}
        </Text>
      ) : null}
      {variant === "cards" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--mantine-spacing-xs)",
          }}
        >
          {controls.map(renderControl)}
        </div>
      ) : (
        <Stack gap="xs">{controls.map(renderControl)}</Stack>
      )}
    </Stack>
  );
}
