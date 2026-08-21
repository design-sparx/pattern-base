import {
  Card,
  Group,
  Loader,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useState } from "react";

import type { RestyleProps } from "@patternbase/core";

export function Restyle({
  content,
  options,
  onRestyle,
  restyledContent,
  isProcessing = false,
  intensity,
  onIntensityChange,
  title = "Restyle",
  variant = "presets",
}: RestyleProps) {
  const [selectedId, setSelectedId] = useState(options[0]?.id ?? "");

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onRestyle(id);
  };

  const renderOptions = () => {
    if (variant === "gallery") {
      return (
        <SimpleGrid cols={2} spacing="xs">
          {options.map((option) => (
            <UnstyledButton
              key={option.id}
              onClick={() => { handleSelect(option.id); }}
            >
              <Card
                padding="sm"
                withBorder
                style={{
                  outline:
                    selectedId === option.id
                      ? "2px solid var(--mantine-color-violet-6)"
                      : undefined,
                }}
              >
                <Stack gap={4}>
                  {option.preview ? <Text
                      size="xs"
                      c="dimmed"
                      style={{ fontStyle: "italic" }}
                      lineClamp={2}
                    >
                      {option.preview}
                    </Text> : null}
                  <Text size="xs" fw={500}>
                    {option.label}
                  </Text>
                  {option.description ? <Text size="xs" c="dimmed">
                      {option.description}
                    </Text> : null}
                </Stack>
              </Card>
            </UnstyledButton>
          ))}
        </SimpleGrid>
      );
    }

    if (variant === "slider") {
      return (
        <Stack gap="xs">
          <Text size="xs" fw={500} c="dimmed">
            Style
          </Text>
          <Group gap="xs" wrap="wrap">
            {options.map((option) => (
              <UnstyledButton
                key={option.id}
                onClick={() => { handleSelect(option.id); }}
              >
                <Text
                  size="sm"
                  fw={selectedId === option.id ? 600 : 400}
                  c={selectedId === option.id ? "violet" : "dimmed"}
                >
                  {option.label}
                </Text>
              </UnstyledButton>
            ))}
          </Group>
        </Stack>
      );
    }

    return (
      <Group gap="xs" wrap="wrap">
        {options.map((option) => (
          <UnstyledButton
            key={option.id}
            onClick={() => { handleSelect(option.id); }}
          >
            <Card
              padding="xs"
              withBorder
              style={{
                cursor: "pointer",
                outline:
                  selectedId === option.id
                    ? "2px solid var(--mantine-color-violet-6)"
                    : undefined,
              }}
            >
              <Group gap="xs">
                {option.icon ? <span>{option.icon}</span> : null}
                <Text size="sm">{option.label}</Text>
              </Group>
            </Card>
          </UnstyledButton>
        ))}
      </Group>
    );
  };

  return (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Text fw={600} size="sm">
          {title}
        </Text>
        {isProcessing ? <Loader size="xs" /> : null}
      </Group>

      <Card padding="sm" withBorder>
        <Text size="sm">{content}</Text>
      </Card>

      {renderOptions()}

      {intensity !== undefined && onIntensityChange ? <Stack gap={4}>
          <Group justify="space-between">
            <Text size="xs" fw={500}>
              Intensity
            </Text>
            <Text size="xs" c="dimmed">
              {intensity}%
            </Text>
          </Group>
          <Slider
            value={intensity}
            onChange={onIntensityChange}
            min={0}
            max={100}
            step={1}
          />
        </Stack> : null}

      {restyledContent ? <Stack gap="xs">
          <Text size="xs" fw={500} c="dimmed" tt="uppercase">
            Result
          </Text>
          <Card padding="sm" withBorder>
            <Text size="sm">{restyledContent}</Text>
          </Card>
        </Stack> : null}
    </Stack>
  );
}
