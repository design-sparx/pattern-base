import { Button, Card, Group, Stack, Text } from "@mantine/core";
import { IconWand } from "@tabler/icons-react";

import type { TransformProps } from "@ai-ui/core";

export function Transform({
  content,
  options,
  onTransform,
  transformedContent,
  isTransforming = false,
  title,
}: TransformProps) {
  return (
    <Stack gap="sm">
      {title && (
        <Text fw={600} size="sm">
          {title}
        </Text>
      )}

      <Card padding="sm" withBorder>
        <Text size="sm">{transformedContent ?? content}</Text>
      </Card>

      <Group gap="xs" wrap="wrap">
        {options.map((opt) => (
          <Button
            key={opt.id}
            variant="default"
            size="compact-sm"
            leftSection={
              opt.icon ? <span>{opt.icon}</span> : <IconWand size={12} />
            }
            onClick={() => onTransform(opt.id)}
            loading={isTransforming}
          >
            {opt.label}
          </Button>
        ))}
      </Group>
    </Stack>
  );
}
