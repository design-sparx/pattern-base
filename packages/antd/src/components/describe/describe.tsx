import { CopyOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tag, theme, Typography } from "antd";

import type { DescribeProps } from "@patternbase/core";

const { Text, Paragraph } = Typography;

export function Describe({
  output,
  details,
  inferredPrompt,
  model,
  seed,
  onReuse,
  onCopy,
  title,
  variant = "panel",
}: Readonly<DescribeProps>) {
  const { token } = theme.useToken();
  if (variant === "inline") {
    return (
      <div>
        {title ? (
          <Text strong style={{ display: "block", marginBottom: 8 }}>
            {title}
          </Text>
        ) : null}
        <Paragraph
          style={{
            fontSize: 13,
            background: token.colorBgLayout,
            padding: 8,
            borderRadius: 6,
          }}
        >
          {output}
        </Paragraph>
        {inferredPrompt ? (
          <div style={{ marginBottom: 8 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Inferred prompt:
            </Text>
            <pre
              style={{
                fontSize: 12,
                margin: "4px 0 0",
                padding: "8px 12px",
                background: token.colorFillTertiary,
                borderRadius: token.borderRadiusSM,
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {inferredPrompt}
            </pre>
          </div>
        ) : null}
        <Space wrap size={4}>
          {details.map((d) => (
            <Tag key={d.id}>
              {d.label}: {d.value}
            </Tag>
          ))}
          {model ? <Tag color="blue">{model}</Tag> : null}
          {seed ? <Tag color="purple">Seed: {seed}</Tag> : null}
        </Space>
      </div>
    );
  }

  return (
    <Card
      size="small"
      title={title ?? "Describe Output"}
      extra={
        <Space>
          {onCopy ? (
            <Button size="small" icon={<CopyOutlined />} onClick={onCopy}>
              Copy
            </Button>
          ) : null}
          {onReuse && inferredPrompt ? (
            <Button
              size="small"
              type="primary"
              icon={<SendOutlined />}
              onClick={() => {
                onReuse(inferredPrompt);
              }}
            >
              Reuse Prompt
            </Button>
          ) : null}
        </Space>
      }
    >
      <Paragraph style={{ fontSize: 13 }}>{output}</Paragraph>
      {inferredPrompt ? (
        <div style={{ marginBottom: 12 }}>
          <Text
            type="secondary"
            style={{ fontSize: 12, display: "block", marginBottom: 4 }}
          >
            Inferred Prompt
          </Text>
          <pre
            style={{
              fontSize: 12,
              margin: 0,
              padding: "8px 12px",
              background: token.colorFillTertiary,
              borderRadius: token.borderRadiusSM,
              color: token.colorText,
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {inferredPrompt}
          </pre>
        </div>
      ) : null}
      <Space wrap size={4}>
        {details.map((d) => (
          <Tag key={d.id} color={d.type === "code" ? "geekblue" : undefined}>
            <Text style={{ fontSize: 11 }}>{d.label}:</Text>{" "}
            <Text strong style={{ fontSize: 11 }}>
              {d.value}
            </Text>
          </Tag>
        ))}
        {model ? <Tag color="blue">{model}</Tag> : null}
        {seed ? <Tag color="purple">Seed: {seed}</Tag> : null}
      </Space>
    </Card>
  );
}
