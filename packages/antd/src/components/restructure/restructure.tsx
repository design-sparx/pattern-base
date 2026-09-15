import { Button, Card, Space, Spin, theme, Typography } from "antd";

import type { RestructureProps } from "@patternbase/core";

const { Text, Paragraph } = Typography;

export function Restructure({
  content,
  options,
  onRestructure,
  restructuredContent,
  isProcessing = false,
  showDiff = false,
  title,
  variant = "buttons",
}: Readonly<RestructureProps>) {
  const { token } = theme.useToken();
  const displayContent = restructuredContent ?? content;

  if (variant === "presets") {
    return (
      <Card size="small" title={title ?? "Restructure"}>
        <Paragraph style={{ fontSize: 13 }}>{displayContent}</Paragraph>
        {showDiff && restructuredContent ? (
          <div
            style={{
              marginBottom: 12,
              padding: 8,
              background: token.colorSuccessBg,
              borderRadius: 6,
              border: `1px solid ${token.colorSuccessBorder}`,
            }}
          >
            <Text type="secondary" style={{ fontSize: 11 }}>
              Original:
            </Text>
            <Paragraph
              type="secondary"
              style={{
                fontSize: 12,
                margin: 0,
                textDecoration: "line-through",
              }}
            >
              {content}
            </Paragraph>
          </div>
        ) : null}
        <Space wrap>
          {options.map((opt) => (
            <Button
              key={opt.id}
              size="small"
              disabled={isProcessing}
              onClick={() => {
                onRestructure(opt.id);
              }}
            >
              {opt.icon ? (
                <span style={{ marginRight: 4 }}>{opt.icon}</span>
              ) : null}
              {opt.label}
            </Button>
          ))}
          {isProcessing ? <Spin size="small" /> : null}
        </Space>
      </Card>
    );
  }

  return (
    <Card size="small" title={title ?? "Restructure"}>
      <Paragraph style={{ fontSize: 13 }}>{displayContent}</Paragraph>
      {showDiff && restructuredContent ? (
        <div
          style={{
            marginBottom: 12,
            padding: 8,
            background: "#f6ffed",
            borderRadius: 6,
            border: "1px solid #b7eb8f",
          }}
        >
          <Text type="secondary" style={{ fontSize: 11 }}>
            Original:
          </Text>
          <Paragraph
            type="secondary"
            style={{ fontSize: 12, margin: 0, textDecoration: "line-through" }}
          >
            {content}
          </Paragraph>
        </div>
      ) : null}
      <div style={{ marginTop: 8 }}>
        <Space wrap>
          {options.map((opt) => (
            <Button
              key={opt.id}
              size="small"
              disabled={isProcessing}
              onClick={() => {
                onRestructure(opt.id);
              }}
            >
              {opt.icon ? (
                <span style={{ marginRight: 4 }}>{opt.icon}</span>
              ) : null}
              {opt.label}
            </Button>
          ))}
          {isProcessing ? <Spin size="small" /> : null}
        </Space>
      </div>
    </Card>
  );
}
