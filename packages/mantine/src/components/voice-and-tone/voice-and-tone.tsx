import { Group, Slider, Stack, Text } from "@mantine/core";
import type { VoiceAndToneProps } from "@patternbase/core";

export function VoiceAndTone({
  axes,
  onChange,
  title = "Voice & Tone",
  showValues = false,
  variant = "sliders",
}: VoiceAndToneProps) {
  return (
    <Stack gap="md">
      {title && (
        <Text fw={600} size="sm">
          {title}
        </Text>
      )}

      {axes.map((axis) => (
        <Stack key={axis.id} gap="xs">
          <Group justify="space-between" align="center">
            <Text size="sm" fw={500}>
              {axis.label}
            </Text>
            {showValues && (
              <Text size="xs" c="dimmed">
                {axis.value}
              </Text>
            )}
          </Group>
          {variant === "compact" ? (
            <Group gap="xs" align="center">
              <Text size="xs" c="dimmed" style={{ minWidth: 60 }}>
                {axis.leftLabel}
              </Text>
              <Slider
                min={axis.min ?? 0}
                max={axis.max ?? 100}
                step={axis.step ?? 1}
                value={axis.value}
                onChange={(v) => onChange(axis.id, v)}
                style={{ flex: 1 }}
                size="xs"
              />
              <Text
                size="xs"
                c="dimmed"
                style={{ minWidth: 60, textAlign: "right" }}
              >
                {axis.rightLabel}
              </Text>
            </Group>
          ) : (
            <>
              <Slider
                min={axis.min ?? 0}
                max={axis.max ?? 100}
                step={axis.step ?? 1}
                value={axis.value}
                onChange={(v) => onChange(axis.id, v)}
                marks={[
                  { value: axis.min ?? 0, label: axis.leftLabel },
                  { value: axis.max ?? 100, label: axis.rightLabel },
                ]}
              />
              <Group justify="space-between">
                <Text size="xs" c="dimmed">
                  {axis.leftLabel}
                </Text>
                <Text size="xs" c="dimmed">
                  {axis.rightLabel}
                </Text>
              </Group>
            </>
          )}
        </Stack>
      ))}
    </Stack>
  );
}
