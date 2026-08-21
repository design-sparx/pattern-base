import {
  Badge,
  Card,
  Group,
  Progress,
  Stack,
  Table,
  Text,
} from "@mantine/core";

import type { CostEstimateProps } from "@patternbase/core";

export function CostEstimate({
  breakdown,
  currency = "USD",
  showTokens = true,
}: CostEstimateProps) {
  const formatCost = (cost: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    }).format(cost);

  const formatTokens = (tokens: number) =>
    new Intl.NumberFormat("en-US").format(tokens);

  const inputPct =
    breakdown.totalTokens > 0
      ? Math.round((breakdown.inputTokens / breakdown.totalTokens) * 100)
      : 0;

  return (
    <Card padding="sm" withBorder>
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Text fw={600} size="sm">
            Cost Estimate
          </Text>
          <Badge variant="light">{formatCost(breakdown.totalCost)}</Badge>
        </Group>

        {breakdown.model ? <Text size="xs" c="dimmed">
            Model: {breakdown.model}
          </Text> : null}

        {showTokens ? <>
            <Progress value={inputPct} size="sm" color="violet" />

            <Table fz="xs" withRowBorders={false}>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td c="dimmed">Input</Table.Td>
                  <Table.Td ta="right">
                    {formatTokens(breakdown.inputTokens)}
                  </Table.Td>
                  <Table.Td ta="right">
                    {formatCost(breakdown.inputCost)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td c="dimmed">Output</Table.Td>
                  <Table.Td ta="right">
                    {formatTokens(breakdown.outputTokens)}
                  </Table.Td>
                  <Table.Td ta="right">
                    {formatCost(breakdown.outputCost)}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={700}>Total</Table.Td>
                  <Table.Td ta="right" fw={700}>
                    {formatTokens(breakdown.totalTokens)}
                  </Table.Td>
                  <Table.Td ta="right" fw={700}>
                    {formatCost(breakdown.totalCost)}
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </> : null}
      </Stack>
    </Card>
  );
}
