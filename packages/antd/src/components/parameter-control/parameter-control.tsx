import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Select,
  Slider,
  Space,
  Switch,
  theme,
  Tooltip,
  Typography,
} from "antd";

import type { ParameterControlProps } from "@patternbase/core";

const { Text } = Typography;

export function ParameterControl({
  parameters,
  onChange,
  title = "Parameters",
  layout = "vertical",
}: ParameterControlProps) {
  const { token } = theme.useToken();
  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      {title ? (
        <Text strong style={{ fontSize: 16 }}>
          {title}
        </Text>
      ) : null}

      <div
        style={
          layout === "horizontal"
            ? { display: "flex", flexWrap: "wrap", gap: 16 }
            : undefined
        }
      >
        {parameters.map((param) => (
          <Space
            key={param.id}
            direction="vertical"
            style={{ width: layout === "horizontal" ? 200 : "100%" }}
            size="small"
          >
            <Space>
              <Text strong>{param.label}</Text>
              {param.description ? (
                <Tooltip title={param.description}>
                  <InfoCircleOutlined
                    style={{ color: token.colorTextSecondary }}
                  />
                </Tooltip>
              ) : null}
            </Space>

            {param.type === "slider" && (
              <>
                <Slider
                  min={param.min ?? 0}
                  max={param.max ?? 100}
                  step={param.step ?? 1}
                  value={param.value as number}
                  onChange={(v) => {
                    onChange(param.id, v);
                  }}
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Current: {String(param.value)}
                </Text>
              </>
            )}

            {param.type === "toggle" && (
              <Switch
                checked={param.value as boolean}
                onChange={(v) => {
                  onChange(param.id, v);
                }}
                checkedChildren="On"
                unCheckedChildren="Off"
              />
            )}

            {param.type === "select" && (
              <Select
                value={param.value as string}
                onChange={(v: string) => {
                  onChange(param.id, v);
                }}
                style={{ width: "100%" }}
                options={param.options?.map((opt) => ({
                  label: opt.label,
                  value: opt.value as string,
                }))}
              />
            )}

            {param.type === "matrix" &&
              (() => {
                const matrixValue = param.value as
                  | Record<string, number>
                  | undefined;
                return (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {param.options?.[0]?.label ?? "X Axis"}
                      </Text>
                      <Slider
                        value={matrixValue?.x ?? 50}
                        onChange={(x) => {
                          onChange(param.id, { ...matrixValue, x });
                        }}
                      />
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {param.options?.[1]?.label ?? "Y Axis"}
                      </Text>
                      <Slider
                        value={matrixValue?.y ?? 50}
                        onChange={(y) => {
                          onChange(param.id, { ...matrixValue, y });
                        }}
                      />
                    </div>
                  </div>
                );
              })()}
          </Space>
        ))}
      </div>
    </Space>
  );
}
