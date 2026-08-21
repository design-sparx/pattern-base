import {
  Badge,
  Card,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

import type { AutoFillProps } from "@patternbase/core";

export function AutoFill({
  suggestions,
  onSelect,
  onQueryChange,
  query = "",
  isLoading = false,
  placeholder = "Start typing...",
  maxSuggestions,
  highlightMatch = true,
}: AutoFillProps) {
  const displayed = maxSuggestions
    ? suggestions.slice(0, maxSuggestions)
    : suggestions;

  const highlight = (text: string) => {
    if (!highlightMatch || !query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.substring(0, idx)}
        <mark
          style={{
            background: "var(--mantine-color-yellow-3)",
            borderRadius: 2,
          }}
        >
          {text.substring(idx, idx + query.length)}
        </mark>
        {text.substring(idx + query.length)}
      </>
    );
  };

  return (
    <Stack gap="xs">
      <TextInput
        value={query}
        onChange={(e) => onQueryChange?.(e.currentTarget.value)}
        placeholder={placeholder}
        rightSection={isLoading ? <Loader size="xs" /> : null}
      />

      {displayed.length > 0 && (
        <Stack gap={4}>
          {displayed.map((s) => (
            <Card
              key={s.id}
              padding="xs"
              withBorder
              style={{ cursor: "pointer" }}
              onClick={() => { onSelect(s); }}
            >
              <Group justify="space-between" align="center">
                <Text size="sm">{highlight(s.text)}</Text>
                {s.matchScore !== undefined && (
                  <Badge size="xs" variant="light" color="gray">
                    {Math.round(s.matchScore * 100)}%
                  </Badge>
                )}
              </Group>
              {s.source ? <Text size="xs" c="dimmed">
                  {s.source}
                </Text> : null}
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
