import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconArrowsShuffle,IconDice } from "@tabler/icons-react";

import type { RandomizeProps } from "@patternbase/core";

export function Randomize({
  onRandomize,
  isRandomizing = false,
  currentSeed,
  onSeedChange,
  showSeed = false,
  label = "Randomize",
  variant = "button",
}: RandomizeProps) {
  if (variant === "icon") {
    return (
      <Tooltip label={label}>
        <ActionIcon
          variant="default"
          size="lg"
          onClick={onRandomize}
          loading={isRandomizing}
        >
          <IconDice size={18} />
        </ActionIcon>
      </Tooltip>
    );
  }

  if (variant === "fab") {
    return (
      <ActionIcon
        variant="filled"
        size="xl"
        radius="xl"
        onClick={onRandomize}
        loading={isRandomizing}
      >
        <IconArrowsShuffle size={22} />
      </ActionIcon>
    );
  }

  return (
    <Stack gap="xs">
      <Group gap="xs">
        <Button
          leftSection={<IconDice size={14} />}
          variant="default"
          size="sm"
          onClick={onRandomize}
          loading={isRandomizing}
        >
          {label}
        </Button>
      </Group>
      {showSeed ? <TextInput
          label="Seed"
          placeholder="Random seed..."
          value={currentSeed ?? ""}
          onChange={(e) => onSeedChange?.(e.currentTarget.value)}
          size="xs"
          rightSection={
            <Tooltip label="Randomize seed">
              <ActionIcon variant="subtle" size="sm" onClick={onRandomize}>
                <IconDice size={12} />
              </ActionIcon>
            </Tooltip>
          }
        /> : null}
      {currentSeed && !showSeed ? <Text size="xs" c="dimmed">
          Seed: {currentSeed}
        </Text> : null}
    </Stack>
  );
}
