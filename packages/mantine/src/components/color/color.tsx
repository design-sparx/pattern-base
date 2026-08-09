import {
  Badge,
  Card,
  ColorSwatch,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import type { ColorProps } from "@patternbase/core";

export function Color({
  options,
  selectedColorId,
  onSelectColor,
  title,
  showLabels = false,
  variant = "swatches",
}: ColorProps) {
  if (variant === "chips") {
    return (
      <Stack gap="xs">
        {title && (
          <Text size="sm" fw={500}>
            {title}
          </Text>
        )}
        <Group gap="xs" wrap="wrap">
          {options.map((option) => (
            <Badge
              key={option.id}
              variant={selectedColorId === option.id ? "filled" : "outline"}
              style={{
                cursor: onSelectColor ? "pointer" : "default",
                borderColor: option.value,
                color: selectedColorId === option.id ? "white" : option.value,
                backgroundColor:
                  selectedColorId === option.id ? option.value : undefined,
              }}
              leftSection={<ColorSwatch color={option.value} size={10} />}
              onClick={() => onSelectColor?.(option.id)}
            >
              {option.label}
            </Badge>
          ))}
        </Group>
      </Stack>
    );
  }

  if (variant === "card") {
    return (
      <Card withBorder padding="md">
        <Stack gap="sm">
          {title && (
            <Text fw={600} size="sm">
              {title}
            </Text>
          )}
          <SimpleGrid cols={4} spacing="xs">
            {options.map((option) => (
              <Stack key={option.id} gap={4} align="center">
                <Tooltip label={option.label} withArrow>
                  <ColorSwatch
                    color={option.value}
                    size={32}
                    onClick={() => onSelectColor?.(option.id)}
                    style={{
                      cursor: onSelectColor ? "pointer" : "default",
                      outline:
                        selectedColorId === option.id
                          ? "3px solid var(--mantine-color-violet-6)"
                          : undefined,
                      outlineOffset: 2,
                    }}
                  />
                </Tooltip>
                <Text size="xs" c="dimmed" ta="center">
                  {option.label}
                </Text>
                {option.description && (
                  <Text size="xs" c="dimmed" ta="center" lineClamp={1}>
                    {option.description}
                  </Text>
                )}
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Card>
    );
  }

  return (
    <Stack gap="xs">
      {title && (
        <Text size="sm" fw={500}>
          {title}
        </Text>
      )}
      <Group gap="xs" wrap="wrap">
        {options.map((option) => (
          <Tooltip key={option.id} label={option.label} withArrow>
            <Stack gap={4} align="center">
              <ColorSwatch
                color={option.value}
                size={24}
                onClick={() => onSelectColor?.(option.id)}
                style={{
                  cursor: onSelectColor ? "pointer" : "default",
                  outline:
                    selectedColorId === option.id
                      ? "2px solid var(--mantine-color-violet-6)"
                      : undefined,
                  outlineOffset: 2,
                }}
              />
              {showLabels && (
                <Text size="xs" c="dimmed">
                  {option.label}
                </Text>
              )}
            </Stack>
          </Tooltip>
        ))}
      </Group>
      {selectedColorId && (
        <Group gap="xs">
          <ColorSwatch
            color={
              options.find((o) => o.id === selectedColorId)?.value ?? "#000"
            }
            size={16}
          />
          <Text size="xs" c="dimmed">
            {options.find((o) => o.id === selectedColorId)?.label}
          </Text>
        </Group>
      )}
    </Stack>
  );
}
