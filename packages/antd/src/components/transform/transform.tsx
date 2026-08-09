import { Button, Card, Dropdown, Space, Spin, theme, Typography } from "antd";

import type { TransformProps } from "@patternbase/core";

const { Text } = Typography;

export function Transform({
  content,
  options,
  onTransform,
  transformedContent,
  isTransforming = false,
  title,
  variant = "buttons",
}: Readonly<TransformProps>) {
  const { token } = theme.useToken();
  const displayContent = transformedContent ?? content;

  if (variant === "dropdown") {
    return (
      <Card size="small" title={title}>
        <Text style={{ fontSize: 13 }}>{displayContent}</Text>
        <div style={{ marginTop: 8 }}>
          <Space>
            <Dropdown
              menu={{
                items: options.map((opt) => ({
                  key: opt.id,
                  label: (
                    <span>
                      {opt.icon ? (
                        <span style={{ marginRight: 4 }}>{opt.icon}</span>
                      ) : null}
                      {opt.label}
                    </span>
                  ),
                  onClick: () => {
                    onTransform(opt.id);
                  },
                })),
              }}
              disabled={isTransforming}
            >
              <Button size="small">Transform</Button>
            </Dropdown>
            {isTransforming ? <Spin size="small" /> : null}
          </Space>
        </div>
      </Card>
    );
  }

  if (variant === "toolbar") {
    return (
      <div>
        {title ? (
          <Text strong style={{ display: "block", marginBottom: 8 }}>
            {title}
          </Text>
        ) : null}
        <div
          style={{
            border: `1px solid ${token.colorBorder}`,
            borderRadius: 6,
            padding: 8,
            marginBottom: 8,
          }}
        >
          <Text style={{ fontSize: 13 }}>{displayContent}</Text>
        </div>
        <Space wrap>
          {options.map((opt) => (
            <Button
              key={opt.id}
              size="small"
              disabled={isTransforming}
              onClick={() => {
                onTransform(opt.id);
              }}
            >
              {opt.icon ? (
                <span style={{ marginRight: 4 }}>{opt.icon}</span>
              ) : null}
              {opt.label}
            </Button>
          ))}
          {isTransforming ? <Spin size="small" /> : null}
        </Space>
      </div>
    );
  }

  return (
    <Card size="small" title={title}>
      <Text style={{ fontSize: 13 }}>{displayContent}</Text>
      <div style={{ marginTop: 8 }}>
        <Space wrap>
          {options.map((opt) => (
            <Button
              key={opt.id}
              size="small"
              disabled={isTransforming}
              onClick={() => {
                onTransform(opt.id);
              }}
            >
              {opt.icon ? (
                <span style={{ marginRight: 4 }}>{opt.icon}</span>
              ) : null}
              {opt.label}
            </Button>
          ))}
          {isTransforming ? <Spin size="small" /> : null}
        </Space>
      </div>
    </Card>
  );
}
