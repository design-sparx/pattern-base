import { Badge, Button, Group, Stack, Text } from "@mantine/core";
import { IconDroplet, IconShieldCheck } from "@tabler/icons-react";

import type { WatermarkProps } from "@patternbase/core";

export function Watermark({
  label = "AI Generated",
  visibility = "visible",
  variant = "badge",
  confidence,
  algorithm,
  onVerify,
}: WatermarkProps) {
  if (visibility === "invisible" && variant !== "banner") {
    return null;
  }

  if (variant === "inline") {
    return (
      <Group gap="xs" align="center">
        <IconDroplet size={12} style={{ opacity: 0.5 }} />
        <Text size="xs" c="dimmed">
          {label}
        </Text>
        {confidence !== undefined && (
          <Text size="xs" c="dimmed">
            ({Math.round(confidence * 100)}%)
          </Text>
        )}
        {onVerify ? <Button variant="subtle" size="compact-xs" onClick={onVerify}>
            Verify
          </Button> : null}
      </Group>
    );
  }

  if (variant === "banner") {
    return (
      <Stack
        gap="xs"
        p="xs"
        style={{ background: "var(--mantine-color-gray-0)", borderRadius: 4 }}
      >
        <Group gap="xs">
          <IconShieldCheck size={16} />
          <Text size="sm" fw={500}>
            {label}
          </Text>
          {confidence !== undefined && (
            <Badge size="xs" variant="light">
              {Math.round(confidence * 100)}% confident
            </Badge>
          )}
        </Group>
        {algorithm ? <Text size="xs" c="dimmed">
            Algorithm: {algorithm}
          </Text> : null}
        {onVerify ? <Button
            variant="light"
            size="compact-sm"
            leftSection={<IconShieldCheck size={12} />}
            onClick={onVerify}
          >
            Verify
          </Button> : null}
      </Stack>
    );
  }

  return (
    <Group gap="xs">
      <Badge
        size="sm"
        variant="light"
        color="gray"
        leftSection={<IconDroplet size={10} />}
      >
        {label}
        {confidence !== undefined && ` · ${String(Math.round(confidence * 100))}%`}
      </Badge>
      {onVerify ? <Button variant="subtle" size="compact-xs" onClick={onVerify}>
          Verify
        </Button> : null}
    </Group>
  );
}
