import { Card, Progress, Space, Table, Tag, Typography } from "antd";

import type { CostEstimateProps } from "@ai-ui/core";

const { Text } = Typography;

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

  const columns = [
    { title: "", dataIndex: "label", key: "label" },
    {
      title: "Tokens",
      dataIndex: "tokens",
      key: "tokens",
      align: "right" as const,
    },
    { title: "Cost", dataIndex: "cost", key: "cost", align: "right" as const },
  ];

  const data = [
    {
      key: "input",
      label: <Text type="secondary">Input</Text>,
      tokens: formatTokens(breakdown.inputTokens),
      cost: formatCost(breakdown.inputCost),
    },
    {
      key: "output",
      label: <Text type="secondary">Output</Text>,
      tokens: formatTokens(breakdown.outputTokens),
      cost: formatCost(breakdown.outputCost),
    },
    {
      key: "total",
      label: <Text strong>Total</Text>,
      tokens: <Text strong>{formatTokens(breakdown.totalTokens)}</Text>,
      cost: <Text strong>{formatCost(breakdown.totalCost)}</Text>,
    },
  ];

  return (
    <Card size="small">
      <Space direction="vertical" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text strong>Cost Estimate</Text>
          <Tag color="default">{formatCost(breakdown.totalCost)}</Tag>
        </div>

        {breakdown.model ? (
          <Text type="secondary" style={{ fontSize: 12 }}>
            Model: {breakdown.model}
          </Text>
        ) : null}

        {showTokens ? (
          <>
            <Progress
              percent={100}
              success={{ percent: inputPct }}
              size="small"
              showInfo={false}
            />

            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              size="small"
              showHeader={false}
            />
          </>
        ) : null}
      </Space>
    </Card>
  );
}
