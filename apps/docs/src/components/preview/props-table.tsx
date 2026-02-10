"use client";

import { Badge, Box, Code, Paper, Table, Text, Title } from "@mantine/core";

import { type PropDefinition } from "@/data/props-data";

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <Paper withBorder style={{ overflow: "hidden" }}>
      <Box
        px="md"
        py="sm"
        style={{
          borderBottom: "1px solid var(--mantine-color-default-border)",
          backgroundColor: "var(--mantine-color-default)",
        }}
      >
        <Title order={4} fz="sm" fw={600}>
          Props
        </Title>
      </Box>
      <Table.ScrollContainer minWidth={600}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Prop</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Default</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {props.map((prop) => (
              <Table.Tr key={prop.name}>
                <Table.Td>
                  <Code fz="xs">{prop.name}</Code>
                </Table.Td>
                <Table.Td>
                  <Badge
                    variant="light"
                    color="violet"
                    size="sm"
                    radius="sm"
                    tt="none"
                    fw={500}
                  >
                    {prop.type}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  {prop.default ? (
                    <Text fz="xs" fw={500}>
                      {prop.default}
                    </Text>
                  ) : (
                    <Text fz="xs" c="red.7" fw={500}>
                      required
                    </Text>
                  )}
                </Table.Td>
                <Table.Td>
                  <Text fz="xs">{prop.description}</Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  );
}
