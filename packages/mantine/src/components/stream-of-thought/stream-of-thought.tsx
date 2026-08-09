import { Accordion, Badge, Group, Loader, Stack, Text } from "@mantine/core";

import type { StreamOfThoughtProps } from "@patternbase/core";

const STEP_CONFIG: Record<string, { icon: string; color: string }> = {
  thinking: { icon: "💭", color: "violet" },
  action: { icon: "⚡", color: "blue" },
  tool_call: { icon: "🔧", color: "orange" },
  result: { icon: "✅", color: "green" },
};

export function StreamOfThought({
  steps,
  isStreaming = false,
  collapsible = true,
}: StreamOfThoughtProps) {
  if (collapsible) {
    return (
      <Stack gap="xs">
        <Group gap="xs">
          <Text size="sm">🧠</Text>
          <Text fw={600} size="sm">
            Reasoning Process
          </Text>
          {isStreaming && <Loader size="xs" />}
          <Badge size="xs" variant="light">
            {steps.length} steps
          </Badge>
        </Group>

        <Accordion variant="separated" radius="sm">
          {steps.map((step, index) => {
            const config = STEP_CONFIG[step.type] ?? {
              icon: "•",
              color: "gray",
            };
            return (
              <Accordion.Item key={step.id} value={step.id}>
                <Accordion.Control>
                  <Group gap="xs">
                    <Badge size="xs" variant="light" color="gray">
                      {index + 1}
                    </Badge>
                    <span>{config.icon}</span>
                    <Text size="sm" fw={500} tt="capitalize">
                      {step.type.replace("_", " ")}
                    </Text>
                    <Text
                      size="xs"
                      c="dimmed"
                      style={{ flex: 1 }}
                      lineClamp={1}
                    >
                      {step.content.substring(0, 80)}
                    </Text>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap="xs">
                    <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                      {step.content}
                    </Text>
                    {step.metadata && Object.keys(step.metadata).length > 0 && (
                      <Text
                        size="xs"
                        c="dimmed"
                        style={{ fontFamily: "monospace" }}
                      >
                        {JSON.stringify(step.metadata, null, 2)}
                      </Text>
                    )}
                    <Text size="xs" c="dimmed">
                      {new Date(step.timestamp).toLocaleString()}
                    </Text>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Stack>
    );
  }

  return (
    <Stack gap="xs">
      <Group gap="xs">
        <Text size="sm">🧠</Text>
        <Text fw={600} size="sm">
          Reasoning Process
        </Text>
        {isStreaming && <Loader size="xs" />}
      </Group>
      {steps.map((step, index) => {
        const config = STEP_CONFIG[step.type] ?? { icon: "•", color: "gray" };
        return (
          <Stack
            key={step.id}
            gap="xs"
            p="sm"
            style={{
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 8,
            }}
          >
            <Group gap="xs">
              <Badge size="xs" variant="light" color="gray">
                {index + 1}
              </Badge>
              <span>{config.icon}</span>
              <Text size="sm" fw={500} tt="capitalize">
                {step.type.replace("_", " ")}
              </Text>
            </Group>
            <Text size="sm">{step.content}</Text>
          </Stack>
        );
      })}
    </Stack>
  );
}
