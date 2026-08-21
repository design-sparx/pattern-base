import {
  Badge,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import type { TemplatesProps } from "@patternbase/core";

export function Templates({
  templates,
  onSelect,
  layout = "grid",
  columns = 2,
  searchable = false,
  groupByCategory = false,
}: TemplatesProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? templates.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : templates;

  const renderItem = (t: (typeof templates)[0]) => (
    <Card
      key={t.id}
      padding="sm"
      withBorder
      style={{ cursor: "pointer" }}
      onClick={() => {
        onSelect(t);
      }}
    >
      <Stack gap="xs">
        <Group justify="space-between" align="flex-start">
          <Group gap="xs">
            {t.icon ? <span>{t.icon}</span> : null}
            <Text fw={600} size="sm">
              {t.name}
            </Text>
          </Group>
          {t.category ? (
            <Badge variant="light" size="xs">
              {t.category}
            </Badge>
          ) : null}
        </Group>
        {t.description ? (
          <Text size="xs" c="dimmed">
            {t.description}
          </Text>
        ) : null}
      </Stack>
    </Card>
  );

  const grouped = groupByCategory
    ? filtered.reduce<Record<string, typeof filtered>>((acc, t) => {
        const cat = t.category ?? "Other";
        acc[cat] = [...(acc[cat] ?? []), t];
        return acc;
      }, {})
    : null;

  const renderTemplates = () => {
    if (grouped) {
      return (
        <Stack gap="md">
          {Object.entries(grouped).map(([category, items]) => (
            <Stack key={category} gap="xs">
              <Text size="xs" fw={500} c="dimmed" tt="uppercase">
                {category}
              </Text>
              {layout === "grid" ? (
                <SimpleGrid cols={columns} spacing="sm">
                  {items.map(renderItem)}
                </SimpleGrid>
              ) : (
                <Stack gap="xs">{items.map(renderItem)}</Stack>
              )}
            </Stack>
          ))}
        </Stack>
      );
    }

    if (layout === "grid") {
      return (
        <SimpleGrid cols={columns} spacing="sm">
          {filtered.map(renderItem)}
        </SimpleGrid>
      );
    }

    return <Stack gap="xs">{filtered.map(renderItem)}</Stack>;
  };

  return (
    <Stack gap="sm">
      {searchable ? (
        <TextInput
          placeholder="Search templates..."
          leftSection={<IconSearch size={14} />}
          value={query}
          onChange={(e) => {
            setQuery(e.currentTarget.value);
          }}
          size="sm"
        />
      ) : null}

      {renderTemplates()}
    </Stack>
  );
}
