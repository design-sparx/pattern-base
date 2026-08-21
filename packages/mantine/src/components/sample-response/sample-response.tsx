import {
  Button,
  Card,
  Group,
  Loader,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { IconCheck, IconRefresh, IconWand } from "@tabler/icons-react";

import type { SampleResponseProps } from "@patternbase/core";

export function SampleResponse({
  sample,
  prompt,
  onGenerateSample,
  onRegenerateSample,
  onAcceptSample,
  isGenerating = false,
  title = "Sample Response",
  variant = "card",
}: SampleResponseProps) {
  const inner = (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Text fw={600} size="sm">
          {title}
        </Text>
        {isGenerating ? <Loader size="xs" /> : null}
      </Group>

      {prompt ? <Text size="xs" c="dimmed" style={{ fontStyle: "italic" }}>
          &ldquo;{prompt}&rdquo;
        </Text> : null}

      {sample ? (
        <>
          <Textarea value={sample} readOnly minRows={3} autosize />
          <Group gap="xs">
            {onRegenerateSample ? <Button
                variant="default"
                size="sm"
                leftSection={<IconRefresh size={14} />}
                onClick={onRegenerateSample}
                disabled={isGenerating}
              >
                Regenerate
              </Button> : null}
            {onAcceptSample ? <Button
                size="sm"
                leftSection={<IconCheck size={14} />}
                onClick={onAcceptSample}
                disabled={isGenerating}
              >
                Accept
              </Button> : null}
          </Group>
        </>
      ) : (
        <Button
          leftSection={<IconWand size={14} />}
          onClick={onGenerateSample}
          loading={isGenerating}
          size="sm"
          variant="default"
        >
          Generate Sample
        </Button>
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
