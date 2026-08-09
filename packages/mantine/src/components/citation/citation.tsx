import { Anchor, Badge, Button, Card, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";

import type {
  CitationProps,
  CitationsListProps,
  InlineCitationProps,
} from "@patternbase/core";

function getRelevanceColor(score: number) {
  if (score >= 0.8) return "green";
  if (score >= 0.5) return "orange";
  return "gray";
}

function getRelevanceLabel(score: number) {
  if (score >= 0.8) return "High";
  if (score >= 0.5) return "Medium";
  return "Low";
}

export function Citation({ citation }: CitationProps) {
  const [expanded, setExpanded] = useState(false);
  const { source, url, snippet, relevance = 1 } = citation;

  return (
    <Card padding="sm" withBorder mb="xs">
      <Stack gap="xs">
        <Group justify="space-between" align="flex-start">
          <Stack gap={2}>
            <Group gap="xs">
              <Text fw={600} size="sm" c="violet">
                {source}
              </Text>
              <Badge
                size="xs"
                color={getRelevanceColor(relevance)}
                variant="light"
              >
                {getRelevanceLabel(relevance)} Relevance
              </Badge>
            </Group>
            {url && (
              <Anchor
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
              >
                {url.length > 60 ? `${url.substring(0, 60)}...` : url}
              </Anchor>
            )}
          </Stack>
          <Button
            variant="subtle"
            size="compact-xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide" : "View"} excerpt
          </Button>
        </Group>

        {expanded && snippet && (
          <Text
            size="sm"
            style={{
              fontStyle: "italic",
              borderLeft: "3px solid var(--mantine-color-violet-6)",
              paddingLeft: 12,
            }}
          >
            &ldquo;{snippet}&rdquo;
          </Text>
        )}
      </Stack>
    </Card>
  );
}

export function CitationsList({
  citations,
  title = "Sources",
  maxVisible = 3,
}: CitationsListProps) {
  const [showAll, setShowAll] = useState(false);
  const display = showAll ? citations : citations.slice(0, maxVisible);

  return (
    <Stack gap="xs">
      <Group gap="xs">
        <Text fw={600} size="sm">
          {title}
        </Text>
        <Badge size="xs" variant="light">
          {citations.length}
        </Badge>
      </Group>

      {display.map((c) => (
        <Citation key={c.id} citation={c} />
      ))}

      {citations.length > maxVisible && (
        <Button
          variant="default"
          size="compact-sm"
          fullWidth
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? "Show fewer"
            : `Show ${String(citations.length - maxVisible)} more`}
        </Button>
      )}
    </Stack>
  );
}

export function InlineCitation({
  citationNumber,
  source,
  url,
}: InlineCitationProps) {
  return (
    <sup>
      <Anchor
        href={url ?? "#"}
        title={source}
        size="xs"
        style={{
          background: "var(--mantine-color-violet-6)",
          color: "white",
          padding: "0 4px",
          borderRadius: 4,
          fontSize: 10,
          textDecoration: "none",
          marginLeft: 2,
        }}
      >
        [{citationNumber}]
      </Anchor>
    </sup>
  );
}
