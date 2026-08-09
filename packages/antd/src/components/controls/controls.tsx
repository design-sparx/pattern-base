import { Card, List, Space, Switch, Tag, theme, Typography } from "antd";

import type { ControlsProps } from "@patternbase/core";

const { Text } = Typography;

const statusColorMap = {
  active: "green",
  disabled: "default",
  restricted: "orange",
} as const;

export function Controls({
  controls,
  onToggleControl,
  title = "Controls",
  variant = "list",
  showStatus = true,
}: Readonly<ControlsProps>) {
  const { token } = theme.useToken();
  return (
    <Card title={title} size="small">
      <List
        grid={variant === "cards" ? { gutter: 12, xs: 1, sm: 2 } : undefined}
        dataSource={controls}
        rowKey="id"
        renderItem={(control) => (
          <List.Item>
            <Space
              direction="vertical"
              size={4}
              style={{
                width: "100%",
                border:
                  variant === "cards"
                    ? `1px solid ${token.colorBorderSecondary}`
                    : "none",
                borderRadius: variant === "cards" ? 8 : 0,
                padding: variant === "cards" ? 12 : 0,
              }}
            >
              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                <Space size={8}>
                  <Text strong>{control.label}</Text>
                  {showStatus && control.status ? (
                    <Tag color={statusColorMap[control.status]}>
                      {control.status}
                    </Tag>
                  ) : null}
                </Space>
                <Switch
                  size="small"
                  checked={control.enabled}
                  disabled={control.locked}
                  onChange={(checked) => {
                    onToggleControl(control.id, checked);
                  }}
                />
              </Space>
              {control.description ? (
                <Text type="secondary">{control.description}</Text>
              ) : null}
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
}
