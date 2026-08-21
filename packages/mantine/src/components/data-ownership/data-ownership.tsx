import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { IconDownload, IconTrash } from "@tabler/icons-react";

import type { DataOwnershipProps } from "@patternbase/core";

export function DataOwnership({
  items,
  onDelete,
  onExport,
  onDeleteAll,
  title = "Your Data",
  variant = "list",
}: DataOwnershipProps) {
  if (variant === "table") {
    return (
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Text fw={600} size="sm">
            {title}
          </Text>
          <Group gap="xs">
            {onExport ? <Button
                variant="default"
                size="compact-sm"
                leftSection={<IconDownload size={14} />}
                onClick={onExport}
              >
                Export
              </Button> : null}
            {onDeleteAll ? <Button
                variant="subtle"
                color="red"
                size="compact-sm"
                leftSection={<IconTrash size={14} />}
                onClick={onDeleteAll}
              >
                Delete All
              </Button> : null}
          </Group>
        </Group>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Data Type</Table.Th>
              <Table.Th>Retention</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {items.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Stack gap={2}>
                    <Text size="sm" fw={500}>
                      {item.dataType}
                    </Text>
                    {item.description ? <Text size="xs" c="dimmed">
                        {item.description}
                      </Text> : null}
                  </Stack>
                </Table.Td>
                <Table.Td>
                  {item.retention ? <Badge size="xs" variant="light">
                      {item.retention}
                    </Badge> : null}
                </Table.Td>
                <Table.Td>
                  {item.deletable && onDelete ? <ActionIcon
                      variant="subtle"
                      color="red"
                      size="sm"
                      onClick={() => { onDelete(item.id); }}
                    >
                      <IconTrash size={14} />
                    </ActionIcon> : null}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    );
  }

  return (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Text fw={600} size="sm">
          {title}
        </Text>
        <Group gap="xs">
          {onExport ? <Button
              variant="default"
              size="compact-sm"
              leftSection={<IconDownload size={14} />}
              onClick={onExport}
            >
              Export
            </Button> : null}
          {onDeleteAll ? <Button
              variant="subtle"
              color="red"
              size="compact-sm"
              onClick={onDeleteAll}
            >
              Delete All
            </Button> : null}
        </Group>
      </Group>

      <Stack gap="xs">
        {items.map((item) => (
          <Card key={item.id} padding="sm" withBorder>
            <Group justify="space-between" align="flex-start">
              <Stack gap={2} style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {item.dataType}
                </Text>
                {item.description ? <Text size="xs" c="dimmed">
                    {item.description}
                  </Text> : null}
                {item.retention ? <Badge size="xs" variant="light" color="gray">
                    Retention: {item.retention}
                  </Badge> : null}
              </Stack>
              {item.deletable && onDelete ? <ActionIcon
                  variant="subtle"
                  color="red"
                  size="sm"
                  onClick={() => { onDelete(item.id); }}
                >
                  <IconTrash size={14} />
                </ActionIcon> : null}
            </Group>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
