import {
  CopyOutlined,
  ExpandOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Card, Spin, Typography } from "antd";
import { useState } from "react";

import type { SummaryProps } from "@patternbase/core";

const { Text } = Typography;

export function Summary({
  content,
  originalLength,
  summaryLength,
  onRegenerate,
  onCopy,
  onExpand,
  isGenerating = false,
  title,
  variant = "card",
}: Readonly<SummaryProps>) {
  const [collapsed, setCollapsed] = useState(variant === "collapsible");

  if (variant === "inline") {
    return (
      <div>
        {title ? (
          <Text strong style={{ marginRight: 4 }}>
            {title}:
          </Text>
        ) : null}
        {isGenerating ? <Spin size="small" /> : <Text>{content}</Text>}
      </div>
    );
  }

  const actions = [];
  if (onRegenerate) {
    actions.push(
      <Button
        key="regen"
        type="text"
        size="small"
        icon={<ReloadOutlined />}
        disabled={isGenerating}
        onClick={onRegenerate}
      >
        Regenerate
      </Button>,
    );
  }
  if (onCopy) {
    actions.push(
      <Button
        key="copy"
        type="text"
        size="small"
        icon={<CopyOutlined />}
        onClick={onCopy}
      >
        Copy
      </Button>,
    );
  }
  if (variant === "collapsible") {
    actions.push(
      <Button
        key="toggle"
        type="link"
        size="small"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? "Expand" : "Collapse"}
      </Button>,
    );
  }
  if (onExpand && variant !== "collapsible") {
    actions.push(
      <Button
        key="expand"
        type="link"
        size="small"
        icon={<ExpandOutlined />}
        onClick={onExpand}
      >
        View full
      </Button>,
    );
  }

  return (
    <Card
      size="small"
      title={title}
      extra={
        originalLength != null && summaryLength != null ? (
          <Text type="secondary" style={{ fontSize: 12 }}>
            {summaryLength} / {originalLength} chars
          </Text>
        ) : undefined
      }
      actions={actions.length > 0 ? actions : undefined}
    >
      {isGenerating ? (
        <div style={{ textAlign: "center", padding: 16 }}>
          <Spin size="small" />
          <div>
            <Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>
              Generating summary...
            </Text>
          </div>
        </div>
      ) : (
        <Text style={{ fontSize: 13 }}>
          {variant === "collapsible" && collapsed
            ? content.slice(0, 150) + (content.length > 150 ? "..." : "")
            : content}
        </Text>
      )}
    </Card>
  );
}
