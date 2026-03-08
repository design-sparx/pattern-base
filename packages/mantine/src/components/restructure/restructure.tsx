import {
  Button,
  Card,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import type { RestructureProps } from "@ai-ui/core";

export function Restructure({
  content,
  options,
  onRestructure,
  restructuredContent,
  isProcessing = false,
  showDiff = false,
  title = "Restructure",
  variant = "buttons",
}: RestructureProps) {
  return (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Text fw={600} size="sm">
          {title}
        </Text>
        {isProcessing && <Loader size="xs" />}
      </Group>

      <Card padding="sm" withBorder>
        <Text size="sm">{content}</Text>
      </Card>

      {variant === "presets" ? (
        <SimpleGrid cols={2} spacing="xs">
          {options.map((option) => (
            <Card
              key={option.id}
              padding="sm"
              withBorder
              style={{ cursor: "pointer" }}
              onClick={() => onRestructure(option.id)}
            >
              <Group gap="xs">
                {option.icon && <span>{option.icon}</span>}
                <Stack gap={2}>
                  <Text size="sm" fw={500}>
                    {option.label}
                  </Text>
                  {option.description && (
                    <Text size="xs" c="dimmed">
                      {option.description}
                    </Text>
                  )}
                </Stack>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Group gap="xs" wrap="wrap">
          {options.map((option) => (
            <Button
              key={option.id}
              variant="default"
              size="sm"
              leftSection={option.icon ? <span>{option.icon}</span> : undefined}
              onClick={() => onRestructure(option.id)}
              disabled={isProcessing}
            >
              {option.label}
            </Button>
          ))}
        </Group>
      )}

      {restructuredContent && (
        <Stack gap="xs">
          <Text size="xs" fw={500} c="dimmed" tt="uppercase">
            {showDiff ? "Changes" : "Result"}
          </Text>
          <Card padding="sm" withBorder>
            <Text size="sm">{restructuredContent}</Text>
          </Card>
        </Stack>
      )}
    </Stack>
  );
}
