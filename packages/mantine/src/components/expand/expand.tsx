import { Accordion, Button, Stack, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

import type { ExpandProps } from "@patternbase/core";

export function Expand({
  content,
  onExpand,
  expandedContent,
  isExpanding = false,
  title,
  variant = "button",
}: ExpandProps) {
  if (variant === "accordion") {
    return (
      <Accordion variant="separated" radius="sm">
        <Accordion.Item value="expand">
          <Accordion.Control onClick={onExpand}>
            <Text size="sm" fw={500}>
              {title ?? "Show full content"}
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Text size="sm">{expandedContent ?? content}</Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  }

  if (variant === "inline") {
    return (
      <Stack gap="xs">
        <Text size="sm">{content}</Text>
        {expandedContent ? <Text size="sm" c="dimmed">
            {expandedContent}
          </Text> : null}
        <Button
          variant="subtle"
          size="compact-sm"
          rightSection={<IconChevronDown size={14} />}
          onClick={onExpand}
          loading={isExpanding}
          w="fit-content"
        >
          Expand
        </Button>
      </Stack>
    );
  }

  return (
    <Stack gap="xs">
      {title ? <Text fw={600} size="sm">
          {title}
        </Text> : null}
      <Text size="sm">{content}</Text>
      {expandedContent ? <Text size="sm" c="dimmed">
          {expandedContent}
        </Text> : null}
      <Button
        variant="default"
        size="sm"
        onClick={onExpand}
        loading={isExpanding}
        w="fit-content"
      >
        Expand
      </Button>
    </Stack>
  );
}
