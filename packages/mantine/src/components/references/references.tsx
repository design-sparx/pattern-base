import {
  ActionIcon,
  Anchor,
  Badge,
  Card,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import type { ReferencesProps } from "@ai-ui/core";

export function References({
  references,
  onSelectReference,
  onRemoveReference,
  title = "References",
  variant = "list",
  showRelevance = false,
}: ReferencesProps) {
  const renderItem = (ref: (typeof references)[0]) => (
    <Card
      key={ref.id}
      padding="sm"
      withBorder
      style={{
        cursor: onSelectReference ? "pointer" : "default",
        outline: ref.selected
          ? "2px solid var(--mantine-color-violet-6)"
          : undefined,
      }}
      onClick={() => onSelectReference?.(ref.id)}
    >
      <Group justify="space-between" align="flex-start">
        <Stack gap={2} style={{ flex: 1 }}>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              {ref.title}
            </Text>
            {ref.type && (
              <Badge size="xs" variant="light">
                {ref.type}
              </Badge>
            )}
            {ref.selected && (
              <Badge size="xs" variant="filled" color="violet">
                Selected
              </Badge>
            )}
          </Group>
          {ref.excerpt && (
            <Text size="xs" c="dimmed" lineClamp={2}>
              {ref.excerpt}
            </Text>
          )}
          {ref.location && (
            <Anchor
              href={ref.location}
              target="_blank"
              size="xs"
              rel="noopener noreferrer"
            >
              {ref.location.length > 50
                ? `${ref.location.substring(0, 50)}...`
                : ref.location}
            </Anchor>
          )}
          {showRelevance && ref.relevance !== undefined && (
            <Group gap="xs" align="center">
              <Progress
                value={ref.relevance * 100}
                size="xs"
                style={{ flex: 1 }}
              />
              <Text size="xs" c="dimmed">
                {Math.round(ref.relevance * 100)}%
              </Text>
            </Group>
          )}
        </Stack>
        {onRemoveReference && (
          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveReference(ref.id);
            }}
          >
            <IconX size={12} />
          </ActionIcon>
        )}
      </Group>
    </Card>
  );

  return (
    <Stack gap="sm">
      <Group gap="xs">
        <Text fw={600} size="sm">
          {title}
        </Text>
        <Badge size="xs" variant="light">
          {references.length}
        </Badge>
      </Group>
      {variant === "cards" ? (
        <SimpleGrid cols={2} spacing="sm">
          {references.map(renderItem)}
        </SimpleGrid>
      ) : (
        <Stack gap="xs">{references.map(renderItem)}</Stack>
      )}
    </Stack>
  );
}
