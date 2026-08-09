import { Alert, Badge, Text } from "@mantine/core";
import { IconRobot } from "@tabler/icons-react";

import type { DisclosureProps } from "@patternbase/core";

const TYPE_LABELS: Record<DisclosureProps["type"], string> = {
  "ai-generated": "AI Generated",
  "ai-assisted": "AI Assisted",
  "ai-suggested": "AI Suggested",
};

const TYPE_COLORS: Record<DisclosureProps["type"], string> = {
  "ai-generated": "violet",
  "ai-assisted": "blue",
  "ai-suggested": "gray",
};

export function Disclosure({
  variant = "badge",
  type,
  model,
  timestamp,
  customLabel,
}: DisclosureProps) {
  const label = customLabel ?? TYPE_LABELS[type];
  const color = TYPE_COLORS[type];

  if (variant === "badge") {
    return (
      <Badge
        color={color}
        leftSection={<IconRobot size={10} />}
        variant="light"
      >
        {label}
        {model ? ` (${model})` : ""}
      </Badge>
    );
  }

  if (variant === "banner") {
    return (
      <Alert icon={<IconRobot size={16} />} color="blue" mb="xs">
        <Text size="sm">
          {label}
          {model ? ` — ${model}` : ""}
          {timestamp && (
            <Text component="span" size="xs" c="dimmed" ml="xs">
              {new Date(timestamp).toLocaleDateString()}
            </Text>
          )}
        </Text>
      </Alert>
    );
  }

  return (
    <Text size="xs" c="dimmed">
      <IconRobot
        size={12}
        style={{ marginRight: 4, verticalAlign: "middle" }}
      />
      {label}
      {model ? ` (${model})` : ""}
    </Text>
  );
}
