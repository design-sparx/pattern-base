import { useState } from "react";
import {
  ActionIcon,
  Card,
  Collapse,
  Group,
  Loader,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconCopy,
  IconRefresh,
  IconZoomIn,
} from "@tabler/icons-react";
import type { SummaryProps } from "@patternbase/core";

export function Summary({
  content,
  originalLength,
  summaryLength,
  onRegenerate,
  onCopy,
  onExpand,
  isGenerating = false,
  title = "Summary",
  variant = "card",
}: SummaryProps) {
  const [collapsed, setCollapsed] = useState(true);

  const inner = (
    <Stack gap="xs">
      <Group justify="space-between" align="center">
        <Group gap="xs">
          <Text fw={600}>{title}</Text>
          {isGenerating && <Loader size="xs" />}
        </Group>
        <Group gap={4}>
          {originalLength !== undefined && summaryLength !== undefined && (
            <Text size="xs" c="dimmed">
              {summaryLength}/{originalLength} chars
            </Text>
          )}
          {onCopy && (
            <Tooltip label="Copy">
              <ActionIcon variant="subtle" size="sm" onClick={onCopy}>
                <IconCopy size={14} />
              </ActionIcon>
            </Tooltip>
          )}
          {onRegenerate && (
            <Tooltip label="Regenerate">
              <ActionIcon
                variant="subtle"
                size="sm"
                onClick={onRegenerate}
                disabled={isGenerating}
              >
                <IconRefresh size={14} />
              </ActionIcon>
            </Tooltip>
          )}
          {onExpand && (
            <Tooltip label="Expand">
              <ActionIcon variant="subtle" size="sm" onClick={onExpand}>
                <IconZoomIn size={14} />
              </ActionIcon>
            </Tooltip>
          )}
          {variant === "collapsible" && (
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={() => setCollapsed((c) => !c)}
            >
              {collapsed ? (
                <IconChevronDown size={14} />
              ) : (
                <IconChevronUp size={14} />
              )}
            </ActionIcon>
          )}
        </Group>
      </Group>
      {variant === "collapsible" ? (
        <Collapse in={!collapsed}>
          <Text size="sm">{content}</Text>
        </Collapse>
      ) : (
        <Text size="sm">{content}</Text>
      )}
    </Stack>
  );

  if (variant === "inline") {
    return <Stack gap="xs">{inner}</Stack>;
  }

  return (
    <Card withBorder padding="md">
      {inner}
    </Card>
  );
}
