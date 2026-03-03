import { Card, Space, Tag, Typography } from "antd";

import type { ColorProps } from "@ai-ui/core";

const { Text } = Typography;

export function Color({
  options,
  selectedColorId,
  onSelectColor,
  title = "AI Identity Color",
  showLabels = true,
  variant = "swatches",
}: Readonly<ColorProps>) {
  const renderSwatch = (option: {
    id: string;
    label: string;
    value: string;
  }) => {
    const selected = option.id === selectedColorId;
    return (
      <button
        key={option.id}
        type="button"
        onClick={() => {
          onSelectColor?.(option.id);
        }}
        style={{
          width: variant === "chips" ? 22 : 28,
          height: variant === "chips" ? 22 : 28,
          borderRadius: "50%",
          border: selected ? "2px solid #111" : "1px solid #d9d9d9",
          backgroundColor: option.value,
          cursor: onSelectColor ? "pointer" : "default",
        }}
        aria-label={option.label}
      />
    );
  };

  if (variant === "chips") {
    return (
      <Space size={8} wrap>
        {options.map((option) => (
          <Tag
            key={option.id}
            bordered={option.id !== selectedColorId}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              cursor: onSelectColor ? "pointer" : "default",
            }}
            onClick={() => {
              onSelectColor?.(option.id);
            }}
          >
            {renderSwatch(option)}
            {option.label}
          </Tag>
        ))}
      </Space>
    );
  }

  if (variant === "card") {
    return (
      <Card size="small" title={title}>
        <Space direction="vertical" size={10} style={{ width: "100%" }}>
          <Space size={10} wrap>
            {options.map((option) => renderSwatch(option))}
          </Space>
          {showLabels ? (
            <Space direction="vertical" size={4}>
              {options.map((option) => (
                <Text key={option.id} type="secondary" style={{ fontSize: 12 }}>
                  {option.label}: {option.value}
                </Text>
              ))}
            </Space>
          ) : null}
        </Space>
      </Card>
    );
  }

  return (
    <Space direction="vertical" size={8}>
      {title ? <Text strong>{title}</Text> : null}
      <Space size={10} wrap>
        {options.map((option) => renderSwatch(option))}
      </Space>
      {showLabels ? (
        <Space size={8} wrap>
          {options.map((option) => (
            <Text key={option.id} type="secondary" style={{ fontSize: 12 }}>
              {option.label}
            </Text>
          ))}
        </Space>
      ) : null}
    </Space>
  );
}
