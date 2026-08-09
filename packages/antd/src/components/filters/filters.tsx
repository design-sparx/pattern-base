import {
  Button,
  Card,
  Checkbox,
  Radio,
  Select,
  Slider,
  Space,
  Typography,
} from "antd";

import type { FiltersProps } from "@patternbase/core";

const { Text } = Typography;

export function Filters({
  groups,
  values,
  onChange,
  onClear,
  layout = "vertical",
  title,
}: Readonly<FiltersProps>) {
  const content = groups.map((group) => (
    <div
      key={group.id}
      style={{ marginBottom: layout === "vertical" ? 16 : 0 }}
    >
      <Text strong style={{ display: "block", marginBottom: 4, fontSize: 13 }}>
        {group.label}
      </Text>

      {group.type === "checkbox" && group.options ? (
        <Checkbox.Group
          value={
            Array.isArray(values[group.id])
              ? (values[group.id] as string[])
              : []
          }
          onChange={(checked) => {
            onChange(group.id, checked);
          }}
        >
          <Space direction="vertical">
            {group.options.map((opt) => (
              <Checkbox key={opt.id} value={opt.value}>
                {opt.label}
                {opt.count != null ? (
                  <Text type="secondary"> ({opt.count})</Text>
                ) : null}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      ) : null}

      {group.type === "radio" && group.options ? (
        <Radio.Group
          value={values[group.id]}
          onChange={(e) => {
            onChange(group.id, e.target.value);
          }}
        >
          <Space direction="vertical">
            {group.options.map((opt) => (
              <Radio key={opt.id} value={opt.value}>
                {opt.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      ) : null}

      {group.type === "range" ? (
        <Slider
          min={group.min ?? 0}
          max={group.max ?? 100}
          step={group.step ?? 1}
          value={(values[group.id] as number) ?? group.min ?? 0}
          onChange={(val) => {
            onChange(group.id, val);
          }}
        />
      ) : null}

      {group.type === "select" && group.options ? (
        <Select
          size="small"
          style={{ width: "100%" }}
          value={(values[group.id] as string) ?? undefined}
          allowClear
          placeholder="All"
          onChange={(val) => {
            onChange(group.id, val);
          }}
          options={group.options.map((opt) => ({
            label: opt.label,
            value: opt.value,
          }))}
        />
      ) : null}
    </div>
  ));

  return (
    <Card size="small">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        {title ? <Text strong>{title}</Text> : null}
        {onClear ? (
          <Button type="link" size="small" onClick={onClear}>
            Clear all
          </Button>
        ) : null}
      </div>
      <div
        style={
          layout === "horizontal"
            ? { display: "flex", flexWrap: "wrap", gap: 24 }
            : undefined
        }
      >
        {content}
      </div>
    </Card>
  );
}
