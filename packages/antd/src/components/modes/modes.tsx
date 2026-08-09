import { Card, Segmented, Space, Tabs, Typography } from "antd";

import type { ModesProps } from "@patternbase/core";

const { Text } = Typography;

export function Modes({
  modes,
  selectedModeId,
  onModeChange,
  title = "Modes",
  variant = "segmented",
}: Readonly<ModesProps>) {
  const enabledModes = modes.filter((mode) => !mode.disabled);

  if (variant === "tabs") {
    return (
      <Card title={title} size="small">
        <Tabs
          size="small"
          activeKey={selectedModeId}
          onChange={onModeChange}
          items={enabledModes.map((mode) => ({
            key: mode.id,
            label: (
              <Space size={6}>
                {mode.icon ? <span>{mode.icon}</span> : null}
                <span>{mode.label}</span>
              </Space>
            ),
            children: mode.description ? (
              <Text type="secondary">{mode.description}</Text>
            ) : null,
          }))}
        />
      </Card>
    );
  }

  return (
    <Card title={title} size="small">
      <Space direction="vertical" style={{ width: "100%" }} size={10}>
        <Segmented
          block
          options={enabledModes.map((mode) => ({
            label: (
              <Space size={6}>
                {mode.icon ? <span>{mode.icon}</span> : null}
                <span>{mode.label}</span>
              </Space>
            ),
            value: mode.id,
          }))}
          value={selectedModeId}
          onChange={(value) => {
            onModeChange(String(value));
          }}
        />
        {enabledModes.map((mode) =>
          mode.id === selectedModeId && mode.description ? (
            <Text key={mode.id} type="secondary">
              {mode.description}
            </Text>
          ) : null,
        )}
      </Space>
    </Card>
  );
}
