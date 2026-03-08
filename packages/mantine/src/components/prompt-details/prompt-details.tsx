import { Anchor, Badge, Card, Group, Stack, Text } from "@mantine/core";
import type { PromptDetailsProps } from "@ai-ui/core";

export function PromptDetails({
  prompt,
  details,
  timestamp,
  model,
  tokenCount,
  variant = "card",
}: PromptDetailsProps) {
  const inner = (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Text fw={600} size="sm">
          Prompt Details
        </Text>
        <Group gap="xs">
          {model && (
            <Badge variant="light" size="sm">
              {model}
            </Badge>
          )}
          {tokenCount !== undefined && (
            <Badge variant="light" size="sm" color="gray">
              {tokenCount} tokens
            </Badge>
          )}
        </Group>
      </Group>

      <Text size="sm" style={{ fontStyle: "italic" }} c="dimmed">
        &ldquo;{prompt}&rdquo;
      </Text>

      {timestamp && (
        <Text size="xs" c="dimmed">
          {timestamp.toLocaleString()}
        </Text>
      )}

      {details.length > 0 && (
        <Stack gap={4}>
          {details.map((detail) => (
            <Group key={detail.id} justify="space-between" align="center">
              <Text size="xs" c="dimmed">
                {detail.label}
              </Text>
              {detail.type === "badge" ? (
                <Badge size="xs" variant="light">
                  {detail.value}
                </Badge>
              ) : detail.type === "link" && detail.url ? (
                <Anchor
                  href={detail.url}
                  target="_blank"
                  size="xs"
                  rel="noopener noreferrer"
                >
                  {detail.value}
                </Anchor>
              ) : (
                <Text size="xs">{detail.value}</Text>
              )}
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
    <Card padding="sm" withBorder>
      {inner}
    </Card>
  );
}
