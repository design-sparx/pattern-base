import {
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";

import type { PromptEnhancerProps } from "@patternbase/core";

export function PromptEnhancer({
  prompt,
  enhancedPrompt,
  onEnhance,
  onApply,
  onEnhancedPromptChange,
  isEnhancing = false,
  title,
  showDiff = false,
}: PromptEnhancerProps) {
  return (
    <Stack gap="sm">
      {title ? <Text fw={600} size="sm">
          {title}
        </Text> : null}

      <Stack gap="xs">
        <Text size="xs" c="dimmed" fw={500}>
          Original
        </Text>
        <Card padding="sm" withBorder>
          <Text size="sm">{prompt}</Text>
        </Card>
      </Stack>

      <Button
        leftSection={<IconSparkles size={14} />}
        onClick={() => { onEnhance(prompt); }}
        loading={isEnhancing}
        variant="default"
        size="sm"
      >
        Enhance Prompt
      </Button>

      {enhancedPrompt ? <Stack gap="xs">
          <Group justify="space-between" align="center">
            <Text size="xs" c="dimmed" fw={500}>
              Enhanced
            </Text>
            <Badge size="xs" variant="light" color="violet">
              AI Improved
            </Badge>
          </Group>
          <Textarea
            value={enhancedPrompt}
            onChange={(e) => onEnhancedPromptChange?.(e.currentTarget.value)}
            minRows={2}
            autosize
            readOnly={!onEnhancedPromptChange}
          />
          {showDiff ? <Text size="xs" c="dimmed">
              {prompt.length} → {enhancedPrompt.length} chars
            </Text> : null}
          {onApply ? <Button size="compact-sm" onClick={() => { onApply(enhancedPrompt); }}>
              Apply
            </Button> : null}
        </Stack> : null}
    </Stack>
  );
}
