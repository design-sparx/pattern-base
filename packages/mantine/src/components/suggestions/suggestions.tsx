import { Badge, Card, Group, SimpleGrid, Stack, Text } from "@mantine/core";

import type { SuggestionsProps } from "@patternbase/core";

export function Suggestions({
  suggestions,
  onSelect,
  columns = 2,
  variant = "card",
}: SuggestionsProps) {
  if (variant === "chip") {
    return (
      <Group gap="xs" wrap="wrap">
        {suggestions.map((s) => (
          <Badge
            key={s.id}
            variant="light"
            size="lg"
            style={{ cursor: "pointer" }}
            onClick={() => { onSelect(s); }}
          >
            {s.icon ? <span style={{ marginRight: 4 }}>{s.icon}</span> : null}
            {s.title}
          </Badge>
        ))}
      </Group>
    );
  }

  return (
    <SimpleGrid cols={columns} spacing="sm">
      {suggestions.map((s) => (
        <Card
          key={s.id}
          padding="sm"
          withBorder
          style={{ cursor: "pointer" }}
          onClick={() => { onSelect(s); }}
        >
          <Stack gap={4}>
            <Text fw={600} size="sm">
              {s.icon ? <span style={{ marginRight: 6 }}>{s.icon}</span> : null}
              {s.title}
            </Text>
            {s.description ? (
              <Text size="xs" c="dimmed">
                {s.description}
              </Text>
            ) : null}
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}
