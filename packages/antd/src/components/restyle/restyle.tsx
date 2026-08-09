import { Button, Card, Slider, Space, Spin, Typography } from "antd";

import type { RestyleProps } from "@patternbase/core";

const { Text, Paragraph } = Typography;

export function Restyle({
  content,
  options,
  onRestyle,
  restyledContent,
  isProcessing = false,
  intensity,
  onIntensityChange,
  title,
  variant = "presets",
}: Readonly<RestyleProps>) {
  const displayContent = restyledContent ?? content;

  if (variant === "gallery") {
    return (
      <Card size="small" title={title ?? "Restyle"}>
        <Paragraph style={{ fontSize: 13 }}>{displayContent}</Paragraph>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 8,
            marginTop: 8,
          }}
        >
          {options.map((opt) => (
            <Button
              key={opt.id}
              style={{
                height: "auto",
                padding: "8px 12px",
                textAlign: "left",
                whiteSpace: "normal",
              }}
              disabled={isProcessing}
              onClick={() => {
                onRestyle(opt.id);
              }}
            >
              {opt.icon ? (
                <span
                  style={{ display: "block", fontSize: 18, marginBottom: 4 }}
                >
                  {opt.icon}
                </span>
              ) : null}
              <Text strong style={{ fontSize: 12, display: "block" }}>
                {opt.label}
              </Text>
              {opt.description ? (
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {opt.description}
                </Text>
              ) : null}
            </Button>
          ))}
        </div>
        {isProcessing ? (
          <div style={{ marginTop: 8, textAlign: "center" }}>
            <Spin size="small" />
          </div>
        ) : null}
      </Card>
    );
  }

  if (variant === "slider") {
    return (
      <Card size="small" title={title ?? "Restyle"}>
        <Paragraph style={{ fontSize: 13 }}>{displayContent}</Paragraph>
        <Space direction="vertical" style={{ width: "100%" }}>
          {options.length > 0 ? (
            <Space wrap>
              {options.map((opt) => (
                <Button
                  key={opt.id}
                  size="small"
                  disabled={isProcessing}
                  onClick={() => {
                    onRestyle(opt.id);
                  }}
                >
                  {opt.icon ? (
                    <span style={{ marginRight: 4 }}>{opt.icon}</span>
                  ) : null}
                  {opt.label}
                </Button>
              ))}
            </Space>
          ) : null}
          {onIntensityChange ? (
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Intensity
              </Text>
              <Slider
                min={0}
                max={100}
                value={intensity ?? 50}
                onChange={onIntensityChange}
                disabled={isProcessing}
              />
            </div>
          ) : null}
        </Space>
        {isProcessing ? (
          <div style={{ marginTop: 8, textAlign: "center" }}>
            <Spin size="small" />
          </div>
        ) : null}
      </Card>
    );
  }

  return (
    <Card size="small" title={title ?? "Restyle"}>
      <Paragraph style={{ fontSize: 13 }}>{displayContent}</Paragraph>
      <div style={{ marginTop: 8 }}>
        <Space wrap>
          {options.map((opt) => (
            <Button
              key={opt.id}
              size="small"
              disabled={isProcessing}
              onClick={() => {
                onRestyle(opt.id);
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
