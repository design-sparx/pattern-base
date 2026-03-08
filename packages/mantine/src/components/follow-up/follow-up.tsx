import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { FollowUpProps } from "@ai-ui/core";

export function FollowUp({
  followUps,
  onSelect,
  variant = "chip",
  title,
  maxVisible,
}: FollowUpProps) {
  const displayed = maxVisible ? followUps.slice(0, maxVisible) : followUps;

  return (
    <Stack gap="xs">
      {title && (
        <Text size="xs" fw={500} c="dimmed" tt="uppercase">
          {title}
        </Text>
      )}

      {variant === "list" ? (
        <Stack gap={4}>
          {displayed.map((item) => (
            <UnstyledButton key={item.id} onClick={() => onSelect(item)}>
              <Card padding="xs" withBorder style={{ cursor: "pointer" }}>
                <Group gap="xs" justify="space-between">
                  <Group gap="xs">
                    {item.icon && <span>{item.icon}</span>}
                    <Text size="sm">{item.text}</Text>
                  </Group>
                  <IconArrowRight size={14} style={{ opacity: 0.4 }} />
                </Group>
              </Card>
            </UnstyledButton>
          ))}
        </Stack>
      ) : variant === "button" ? (
        <Stack gap="xs">
          {displayed.map((item) => (
            <Button
              key={item.id}
              variant="default"
              size="sm"
              leftSection={item.icon ? <span>{item.icon}</span> : undefined}
              rightSection={<IconArrowRight size={14} />}
              onClick={() => onSelect(item)}
            >
              {item.text}
            </Button>
          ))}
        </Stack>
      ) : (
        <Group gap="xs" wrap="wrap">
          {displayed.map((item) => (
            <Button
              key={item.id}
              variant="light"
              size="compact-sm"
              rightSection={<IconArrowRight size={12} />}
              onClick={() => onSelect(item)}
            >
              {item.text}
            </Button>
          ))}
        </Group>
      )}
    </Stack>
  );
}
