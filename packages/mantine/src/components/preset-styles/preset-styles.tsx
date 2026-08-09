import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import type { PresetStylesProps } from "@patternbase/core";

export function PresetStyles({
  presets,
  selectedPresetId,
  onApplyPreset,
  title,
  variant = "buttons",
}: PresetStylesProps) {
  return (
    <Stack gap="sm">
      {title && (
        <Text fw={600} size="sm">
          {title}
        </Text>
      )}

      {variant === "cards" ? (
        <SimpleGrid cols={2} spacing="sm">
          {presets.map((preset) => (
            <Card
              key={preset.id}
              padding="sm"
              withBorder
              style={{
                cursor: "pointer",
                outline:
                  selectedPresetId === preset.id
                    ? "2px solid var(--mantine-color-violet-6)"
                    : undefined,
              }}
              onClick={() => onApplyPreset(preset.id, preset.values)}
            >
              <Stack gap="xs">
                <Group justify="space-between" align="flex-start">
                  <Group gap="xs">
                    {preset.icon && <span>{preset.icon}</span>}
                    <Text fw={600} size="sm">
                      {preset.label}
                    </Text>
                  </Group>
                  {selectedPresetId === preset.id && (
                    <Badge size="xs" variant="filled" color="violet">
                      Active
                    </Badge>
                  )}
                </Group>
                {preset.description && (
                  <Text size="xs" c="dimmed">
                    {preset.description}
                  </Text>
                )}
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Group gap="xs" wrap="wrap">
          {presets.map((preset) => (
            <Button
              key={preset.id}
              variant={selectedPresetId === preset.id ? "filled" : "default"}
              size="sm"
              leftSection={preset.icon ? <span>{preset.icon}</span> : undefined}
              onClick={() => onApplyPreset(preset.id, preset.values)}
            >
              {preset.label}
            </Button>
          ))}
        </Group>
      )}
    </Stack>
  );
}
