import { Badge, Collapse, Space, Spin, Tag, Typography } from "antd";

import type { StreamOfThoughtProps } from "@ai-ui/core";

const { Text } = Typography;

const STEP_CONFIG: Record<string, { icon: string; color: string }> = {
  thinking: { icon: "\uD83D\uDCAD", color: "purple" },
  action: { icon: "\u26A1", color: "blue" },
  tool_call: { icon: "\uD83D\uDD27", color: "orange" },
  result: { icon: "\u2705", color: "green" },
};

export function StreamOfThought({
  steps,
  isStreaming = false,
  collapsible = true,
}: StreamOfThoughtProps) {
  const items = steps.map((step, index) => {
    const config = STEP_CONFIG[step.type] ?? {
      icon: "\u2022",
      color: "default",
    };

    return {
      key: step.id,
      label: (
        <Space>
          <Badge count={index + 1} style={{ backgroundColor: "#6b7280" }} />
          <span>{config.icon}</span>
          <Text strong style={{ textTransform: "capitalize" as const }}>
            {step.type.replace("_", " ")}
          </Text>
          <Text type="secondary" ellipsis style={{ maxWidth: 300 }}>
            {step.content.substring(0, 80)}
          </Text>
        </Space>
      ),
      children: (
        <div>
          <pre style={{ whiteSpace: "pre-wrap", margin: "0 0 8px" }}>
            {step.content}
          </pre>
          {step.metadata && Object.keys(step.metadata).length > 0 ? (
            <div
              style={{
                borderTop: "1px solid #f0f0f0",
                paddingTop: 8,
                marginTop: 8,
              }}
            >
              <Text strong style={{ fontSize: 12 }}>
                Metadata:
              </Text>
              <pre style={{ fontSize: 12, color: "#999" }}>
                {JSON.stringify(step.metadata, null, 2)}
              </pre>
            </div>
          ) : null}
          <Text type="secondary" style={{ fontSize: 12 }}>
            {new Date(step.timestamp).toLocaleString()}
          </Text>
        </div>
      ),
    };
  });

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space>
        <span>{"\uD83E\uDDE0"}</span>
        <Text strong>Reasoning Process</Text>
        {isStreaming ? <Spin size="small" /> : null}
        <Tag>{steps.length} steps</Tag>
      </Space>

      {collapsible ? (
        <Collapse items={items} />
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          {steps.map((step, index) => {
            const config = STEP_CONFIG[step.type] ?? {
              icon: "\u2022",
              color: "default",
            };
            return (
              <div
                key={step.id}
                style={{
                  border: "1px solid #f0f0f0",
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <Space style={{ marginBottom: 4 }}>
                  <Badge
                    count={index + 1}
                    style={{ backgroundColor: "#6b7280" }}
                  />
                  <span>{config.icon}</span>
                  <Text strong style={{ textTransform: "capitalize" as const }}>
                    {step.type.replace("_", " ")}
                  </Text>
                </Space>
                <p style={{ margin: 0, fontSize: 13 }}>{step.content}</p>
              </div>
            );
          })}
        </Space>
      )}
    </Space>
  );
}
