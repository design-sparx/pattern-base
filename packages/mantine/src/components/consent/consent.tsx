import { Button, Card, Checkbox, Divider, Stack, Text } from "@mantine/core";
import { useState } from "react";

import type { ConsentProps } from "@patternbase/core";

export function Consent({
  items,
  onAccept,
  onDecline,
  title,
  description,
  acceptLabel = "Accept",
  declineLabel = "Decline",
  variant = "inline",
}: ConsentProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(
      items.map((item) => [item.id, item.defaultChecked ?? false]),
    ),
  );

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const requiredItems = items.filter((i) => i.required);
  const allRequiredChecked = requiredItems.every((i) => checked[i.id]);

  const handleAccept = () => {
    const acceptedIds = Object.entries(checked)
      .filter(([, v]) => v)
      .map(([k]) => k);
    onAccept(acceptedIds);
  };

  const inner = (
    <Stack gap="sm">
      {title ? <Text fw={600}>{title}</Text> : null}
      {description ? (
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      ) : null}

      <Stack gap="xs">
        {items.map((item) => (
          <Checkbox
            key={item.id}
            label={
              <Stack gap={2}>
                <Text size="sm">
                  {item.label}
                  {item.required ? (
                    <Text component="span" c="red" ml={4}>
                      *
                    </Text>
                  ) : null}
                </Text>
                {item.description ? (
                  <Text size="xs" c="dimmed">
                    {item.description}
                  </Text>
                ) : null}
              </Stack>
            }
            checked={Boolean(checked[item.id])}
            onChange={() => {
              toggle(item.id);
            }}
            disabled={item.required ? !item.defaultChecked : undefined}
          />
        ))}
      </Stack>

      <Divider />

      <Stack gap="xs">
        <Button onClick={handleAccept} disabled={!allRequiredChecked}>
          {acceptLabel}
        </Button>
        {onDecline ? (
          <Button variant="subtle" color="gray" onClick={onDecline}>
            {declineLabel}
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );

  if (variant === "inline") {
    return inner;
  }

  return (
    <Card withBorder padding="md">
      {inner}
    </Card>
  );
}
