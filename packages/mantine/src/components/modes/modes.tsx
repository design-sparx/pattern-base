import {
  Card,
  Group,
  SegmentedControl,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";

import type { ModesProps } from "@patternbase/core";

export function Modes({
  modes,
  selectedModeId,
  onModeChange,
  title,
  variant = "segmented",
}: ModesProps) {
  const selectedMode = modes.find((m) => m.id === selectedModeId);

  return (
    <Stack gap="sm">
      {title ? (
        <Text fw={600} size="sm">
          {title}
        </Text>
      ) : null}

      {variant === "tabs" ? (
        <Tabs
          value={selectedModeId}
          onChange={(id) => {
            if (id) {
              onModeChange(id);
            }
          }}
        >
          <Tabs.List>
            {modes.map((mode) => (
              <Tabs.Tab
                key={mode.id}
                value={mode.id}
                leftSection={mode.icon ? <span>{mode.icon}</span> : undefined}
                disabled={mode.disabled}
              >
                {mode.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {selectedMode?.description ? (
            <Tabs.Panel value={selectedModeId} pt="sm">
              <Card padding="xs" withBorder>
                <Text size="xs" c="dimmed">
                  {selectedMode.description}
                </Text>
              </Card>
            </Tabs.Panel>
          ) : null}
        </Tabs>
      ) : (
        <>
          <SegmentedControl
            data={modes.map((m) => ({
              value: m.id,
              label: (
                <Group gap="xs" wrap="nowrap">
                  {m.icon ? <span>{m.icon}</span> : null}
                  <span>{m.label}</span>
                </Group>
              ),
              disabled: m.disabled,
            }))}
            value={selectedModeId}
            onChange={onModeChange}
            fullWidth
          />
          {selectedMode?.description ? (
            <Card padding="xs" withBorder>
              <Text size="xs" c="dimmed">
                {selectedMode.description}
              </Text>
            </Card>
          ) : null}
        </>
      )}
    </Stack>
  );
}
