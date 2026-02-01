import { RobotOutlined } from "@ant-design/icons";
import { Alert, Space, Tag, Typography } from "antd";

import type { DisclosureProps } from "@ai-ui/core";

const { Text } = Typography;

const TYPE_LABELS: Record<DisclosureProps["type"], string> = {
  "ai-generated": "AI Generated",
  "ai-assisted": "AI Assisted",
  "ai-suggested": "AI Suggested",
};

const TYPE_COLORS: Record<DisclosureProps["type"], string> = {
  "ai-generated": "processing",
  "ai-assisted": "blue",
  "ai-suggested": "default",
};

export function Disclosure({
  variant = "badge",
  type,
  model,
  timestamp,
  customLabel,
}: DisclosureProps) {
  const label = customLabel ?? TYPE_LABELS[type];
  const color = TYPE_COLORS[type];

  if (variant === "badge") {
    return (
      <Tag color={color} icon={<RobotOutlined />}>
        {label}
        {model ? (
          <Text type="secondary" style={{ marginLeft: 4 }}>
            ({model})
          </Text>
        ) : null}
      </Tag>
    );
  }

  if (variant === "banner") {
    return (
      <Alert
        type="info"
        showIcon
        icon={<RobotOutlined />}
        message={
          <Space>
            <span>{label}</span>
            {model ? <Text type="secondary">- {model}</Text> : null}
            {timestamp ? (
              <Text type="secondary" style={{ marginLeft: "auto" }}>
                {new Date(timestamp).toLocaleDateString()}
              </Text>
            ) : null}
          </Space>
        }
        style={{ marginBottom: 8 }}
      />
    );
  }

  // inline
  return (
    <Text type="secondary" style={{ fontSize: 12 }}>
      <RobotOutlined style={{ marginRight: 4 }} />
      {label}
      {model ? ` (${model})` : null}
    </Text>
  );
}
