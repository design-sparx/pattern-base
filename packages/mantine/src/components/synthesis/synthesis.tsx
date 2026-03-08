import {
  Anchor,
  Badge,
  Button,
  Card,
  Group,
  Loader,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import type { SynthesisProps } from "@ai-ui/core";

export function Synthesis({
  sources,
  insights,
  onSourceClick,
  onRegenerate,
  isProcessing = false,
  title = "Synthesis",
  showSources = true,
  showConfidence = false,
  variant: _variant = "aggregated",
}: SynthesisProps) {
  const insightTypeColor = (type?: string) => {
    if (type === "fact") return "blue";
    if (type === "inference") return "violet";
    if (type === "theme") return "teal";
    return "gray";
  };

  return (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Group gap="xs">
          <Text fw={600} size="sm">
            {title}
          </Text>
          {isProcessing && <Loader size="xs" />}
          {sources.length > 0 && (
            <Badge size="xs" variant="light">
              {sources.length} sources
            </Badge>
          )}
        </Group>
        {onRegenerate && (
          <Button
            variant="subtle"
            size="compact-sm"
            leftSection={<IconRefresh size={14} />}
            onClick={onRegenerate}
            disabled={isProcessing}
          >
            Regenerate
          </Button>
        )}
      </Group>

      {insights.length > 0 && (
        <Stack gap="xs">
          <Text size="xs" fw={500} c="dimmed" tt="uppercase">
            Insights
          </Text>
          {insights.map((insight) => (
            <Card key={insight.id} padding="sm" withBorder>
              <Stack gap="xs">
                <Group gap="xs">
                  {insight.type && (
                    <Badge
                      size="xs"
                      color={insightTypeColor(insight.type)}
                      variant="light"
                    >
                      {insight.type}
                    </Badge>
                  )}
                  <Text size="sm">{insight.text}</Text>
                </Group>
                {showConfidence && insight.confidence !== undefined && (
                  <Group gap="xs" align="center">
                    <Text size="xs" c="dimmed">
                      Confidence:
                    </Text>
                    <Progress
                      value={insight.confidence * 100}
                      size="xs"
                      style={{ flex: 1 }}
                    />
                    <Text size="xs" c="dimmed">
                      {Math.round(insight.confidence * 100)}%
                    </Text>
                  </Group>
                )}
                {insight.sourceIds.length > 0 && (
                  <Group gap={4} wrap="wrap">
                    {insight.sourceIds.map((id) => {
                      const src = sources.find((s) => s.id === id);
                      return src ? (
                        <Badge
                          key={id}
                          size="xs"
                          variant="outline"
                          style={{
                            cursor: onSourceClick ? "pointer" : "default",
                          }}
                          onClick={() => onSourceClick?.(id)}
                        >
                          {src.title}
                        </Badge>
                      ) : null;
                    })}
                  </Group>
                )}
              </Stack>
            </Card>
          ))}
        </Stack>
      )}

      {showSources && sources.length > 0 && (
        <Stack gap="xs">
          <Text size="xs" fw={500} c="dimmed" tt="uppercase">
            Sources
          </Text>
          {sources.map((source) => (
            <Card
              key={source.id}
              padding="xs"
              withBorder
              style={{ cursor: onSourceClick ? "pointer" : "default" }}
              onClick={() => onSourceClick?.(source.id)}
            >
              <Group justify="space-between" align="flex-start">
                <Stack gap={2} style={{ flex: 1 }}>
                  <Text size="xs" fw={500}>
                    {source.title}
                  </Text>
                  {source.content && (
                    <Text size="xs" c="dimmed" lineClamp={2}>
                      {source.content}
                    </Text>
                  )}
                  {source.url && (
                    <Anchor
                      href={source.url}
                      target="_blank"
                      size="xs"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {source.url.length > 50
                        ? `${source.url.substring(0, 50)}...`
                        : source.url}
                    </Anchor>
                  )}
                </Stack>
                {source.relevance !== undefined && (
                  <Badge size="xs" variant="light" color="gray">
                    {Math.round(source.relevance * 100)}% relevant
                  </Badge>
                )}
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
