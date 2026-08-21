import {
  ActionIcon,
  Badge,
  Card,
  Code,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";

import type { DescribeDetail, DescribeProps } from "@patternbase/core";

function renderDetailValue(detail: DescribeDetail) {
  if (detail.type === "badge") {
    return (
      <Badge size="xs" variant="light">
        {detail.value}
      </Badge>
    );
  }
  if (detail.type === "code" || detail.type === "json") {
    return <Code fz="xs">{detail.value}</Code>;
  }
  return <Text size="xs">{detail.value}</Text>;
}

export function Describe({
  output,
  details,
  inferredPrompt,
  model,
  seed,
  onReuse,
  onCopy,
  title = "Description",
  variant = "panel",
}: DescribeProps) {
  const inner = (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Text fw={600} size="sm">
          {title}
        </Text>
        <Group gap={4}>
          {model ? <Badge size="xs" variant="light">
              {model}
            </Badge> : null}
          {seed ? <Badge size="xs" variant="light" color="gray">
              seed: {seed}
            </Badge> : null}
          {onCopy ? <Tooltip label="Copy">
              <ActionIcon variant="subtle" size="sm" onClick={onCopy}>
                <IconCopy size={14} />
              </ActionIcon>
            </Tooltip> : null}
        </Group>
      </Group>

      <Text size="sm">{output}</Text>

      {inferredPrompt ? <Stack gap={4}>
          <Text size="xs" fw={500} c="dimmed" tt="uppercase">
            Inferred Prompt
          </Text>
          <Card padding="xs" withBorder>
            <Group justify="space-between" align="center">
              <Text size="xs" style={{ fontStyle: "italic", flex: 1 }}>
                &ldquo;{inferredPrompt}&rdquo;
              </Text>
              {onReuse ? <Badge
                  size="xs"
                  variant="light"
                  color="violet"
                  style={{ cursor: "pointer" }}
                  onClick={() => { onReuse(inferredPrompt); }}
                >
                  Reuse
                </Badge> : null}
            </Group>
          </Card>
        </Stack> : null}

      {details.length > 0 && (
        <Stack gap={4}>
          {details.map((detail) => (
            <Group key={detail.id} justify="space-between" align="flex-start">
              <Text size="xs" c="dimmed">
                {detail.label}
              </Text>
              {renderDetailValue(detail)}
            </Group>
          ))}
        </Stack>
      )}
    </Stack>
  );

  if (variant === "inline") {
    return <Stack gap="sm">{inner}</Stack>;
  }

  return (
    <Card withBorder padding="md">
      {inner}
    </Card>
  );
}
