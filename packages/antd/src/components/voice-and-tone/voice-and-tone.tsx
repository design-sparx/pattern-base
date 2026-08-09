import { Card, Slider, Space, Typography } from "antd";

import type { VoiceAndToneProps } from "@patternbase/core";

const { Text } = Typography;

export function VoiceAndTone({
  axes,
  onChange,
  title = "Voice and Tone",
  showValues = true,
  variant = "sliders",
}: Readonly<VoiceAndToneProps>) {
  return (
    <Card size="small" title={title}>
      <Space direction="vertical" style={{ width: "100%" }} size={12}>
        {axes.map((axis) => (
          <div key={axis.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <Text strong style={{ fontSize: 12 }}>
                {axis.label}
              </Text>
              {showValues ? (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {axis.value}
                </Text>
              ) : null}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {variant === "sliders" ? (
                <Text
                  type="secondary"
                  style={{ fontSize: 12, whiteSpace: "nowrap" }}
                >
                  {axis.leftLabel}
                </Text>
              ) : null}
              <Slider
                min={axis.min ?? -100}
                max={axis.max ?? 100}
                step={axis.step ?? 1}
                value={axis.value}
                onChange={(value) => {
                  onChange(axis.id, Number(value));
                }}
                style={{ flex: 1, margin: 0 }}
              />
              {variant === "sliders" ? (
                <Text
                  type="secondary"
                  style={{ fontSize: 12, whiteSpace: "nowrap" }}
                >
                  {axis.rightLabel}
                </Text>
              ) : null}
            </div>
          </div>
        ))}
      </Space>
    </Card>
  );
}
