import {
  Badge,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import type { VariationsProps } from "@patternbase/core";

export function Variations({
  variations,
  selectedId,
  onSelect,
  layout = "grid",
  columns = 2,
}: VariationsProps) {
  if (layout === "tabs") {
    return (
      <Tabs
        value={selectedId ?? variations[0]?.id}
        onChange={(key) => key && onSelect?.(key)}
      >
        <Tabs.List>
          {variations.map((v, i) => (
            <Tabs.Tab key={v.id} value={v.id}>
              {v.label ?? `Variation ${String(i + 1)}`}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {variations.map((v) => (
          <Tabs.Panel key={v.id} value={v.id} pt="sm">
            <Text size="sm">{v.content}</Text>
          </Tabs.Panel>
        ))}
      </Tabs>
    );
  }

  if (layout === "list") {
    return (
      <Stack gap="sm">
        {variations.map((v, i) => (
          <Card
            key={v.id}
            padding="sm"
            withBorder
            style={{
              outline:
                selectedId === v.id
                  ? "2px solid var(--mantine-color-violet-6)"
                  : undefined,
              cursor: onSelect ? "pointer" : "default",
            }}
            onClick={() => onSelect?.(v.id)}
          >
            <Stack gap="xs">
              <Group gap="xs">
                <Badge size="xs" variant="light">
                  {v.label ?? `#${String(i + 1)}`}
                </Badge>
                {selectedId === v.id && (
                  <Badge
                    size="xs"
                    color="violet"
                    leftSection={<IconCheck size={10} />}
                  >
                    Selected
                  </Badge>
                )}
              </Group>
              <Text size="sm">{v.content}</Text>
            </Stack>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <SimpleGrid cols={columns} spacing="sm">
      {variations.map((v, i) => (
        <Card
          key={v.id}
          padding="sm"
          withBorder
          style={{
            outline:
              selectedId === v.id
                ? "2px solid var(--mantine-color-violet-6)"
                : undefined,
            cursor: onSelect ? "pointer" : "default",
          }}
          onClick={() => onSelect?.(v.id)}
        >
          <Stack gap="xs">
            <Group gap="xs">
              <Badge size="xs" variant="light">
                {v.label ?? `Variation ${String(i + 1)}`}
              </Badge>
              {selectedId === v.id && (
                <Badge
                  size="xs"
                  color="violet"
                  leftSection={<IconCheck size={10} />}
                >
                  Selected
                </Badge>
              )}
            </Group>
            <Text size="sm">{v.content}</Text>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}
