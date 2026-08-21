import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconDeviceFloppy, IconStar, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

import type { SavedStylesProps } from "@patternbase/core";

export function SavedStyles({
  styles,
  selectedStyleId,
  onSelectStyle,
  onSaveStyle,
  onDeleteStyle,
  title,
  variant = "list",
  maxVisible,
}: SavedStylesProps) {
  const [saveName, setSaveName] = useState("");

  const displayed = maxVisible ? styles.slice(0, maxVisible) : styles;

  return (
    <Stack gap="sm">
      {title ? <Text fw={600} size="sm">
          {title}
        </Text> : null}

      <Group gap="xs">
        <TextInput
          placeholder="Style name..."
          value={saveName}
          onChange={(e) => { setSaveName(e.currentTarget.value); }}
          size="sm"
          style={{ flex: 1 }}
        />
        <Button
          leftSection={<IconDeviceFloppy size={14} />}
          variant="default"
          size="sm"
          onClick={() => {
            if (saveName.trim()) {
              onSaveStyle(saveName.trim());
              setSaveName("");
            }
          }}
          disabled={!saveName.trim()}
        >
          Save
        </Button>
      </Group>

      {variant === "cards" ? (
        <Stack gap="xs">
          {displayed.map((style) => (
            <Card
              key={style.id}
              padding="sm"
              withBorder
              style={{
                cursor: "pointer",
                outline:
                  selectedStyleId === style.id
                    ? "2px solid var(--mantine-color-violet-6)"
                    : undefined,
              }}
              onClick={() => { onSelectStyle(style.id); }}
            >
              <Group justify="space-between" align="center">
                <Stack gap={2}>
                  <Group gap="xs">
                    <Text size="sm" fw={600}>
                      {style.name}
                    </Text>
                    {style.isDefault ? <Badge
                        size="xs"
                        variant="light"
                        color="yellow"
                        leftSection={<IconStar size={10} />}
                      >
                        Default
                      </Badge> : null}
                    {selectedStyleId === style.id && (
                      <Badge size="xs" variant="filled" color="violet">
                        Active
                      </Badge>
                    )}
                  </Group>
                  {style.description ? <Text size="xs" c="dimmed">
                      {style.description}
                    </Text> : null}
                </Stack>
                {onDeleteStyle ? <ActionIcon
                    variant="subtle"
                    color="red"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteStyle(style.id);
                    }}
                  >
                    <IconTrash size={14} />
                  </ActionIcon> : null}
              </Group>
            </Card>
          ))}
        </Stack>
      ) : (
        <Stack gap="xs">
          {displayed.map((style) => (
            <Group key={style.id} justify="space-between" align="center">
              <Group
                gap="xs"
                style={{ cursor: "pointer", flex: 1 }}
                onClick={() => { onSelectStyle(style.id); }}
              >
                <Text size="sm" fw={selectedStyleId === style.id ? 600 : 400}>
                  {style.name}
                </Text>
                {style.isDefault ? <Badge size="xs" variant="light" color="yellow">
                    Default
                  </Badge> : null}
                {selectedStyleId === style.id && (
                  <Badge size="xs" variant="filled" color="violet">
                    Active
                  </Badge>
                )}
              </Group>
              {onDeleteStyle ? <ActionIcon
                  variant="subtle"
                  color="red"
                  size="sm"
                  onClick={() => { onDeleteStyle(style.id); }}
                >
                  <IconTrash size={14} />
                </ActionIcon> : null}
            </Group>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
