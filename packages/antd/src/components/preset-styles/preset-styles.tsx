import { Button, Card, Space, Typography } from "antd";

import type { PresetStylesProps } from "@patternbase/core";

const { Text } = Typography;

export function PresetStyles({
  presets,
  selectedPresetId,
  onApplyPreset,
  title = "Preset Styles",
  variant = "buttons",
}: Readonly<PresetStylesProps>) {
  if (variant === "cards") {
    return (
      <Card size="small" title={title}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 8,
          }}
        >
          {presets.map((preset) => (
            <Card
              key={preset.id}
              size="small"
              style={{
                cursor: "pointer",
                borderColor:
                  selectedPresetId === preset.id ? "#1677ff" : undefined,
              }}
              onClick={() => {
                onApplyPreset(preset.id, preset.values);
              }}
            >
              <Space direction="vertical" size={2}>
                <Text strong>
                  {preset.icon ? (
                    <span style={{ marginRight: 4 }}>{preset.icon}</span>
                  ) : null}
                  {preset.label}
                </Text>
                {preset.description ? (
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {preset.description}
                  </Text>
                ) : null}
              </Space>
            </Card>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card size="small" title={title}>
      <Space wrap>
        {presets.map((preset) => (
          <Button
            key={preset.id}
            type={selectedPresetId === preset.id ? "primary" : "default"}
            size="small"
            onClick={() => {
              onApplyPreset(preset.id, preset.values);
            }}
          >
            {preset.icon ? (
              <span style={{ marginRight: 4 }}>{preset.icon}</span>
            ) : null}
            {preset.label}
          </Button>
        ))}
      </Space>
    </Card>
  );
}
