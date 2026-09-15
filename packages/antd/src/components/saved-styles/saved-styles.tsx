import { Button, Card, Input, List, Space, Tag, Typography } from "antd";
import { useMemo, useState } from "react";

import type { SavedStylesProps } from "@patternbase/core";

const { Text } = Typography;

export function SavedStyles({
  styles,
  selectedStyleId,
  onSelectStyle,
  onSaveStyle,
  onDeleteStyle,
  title = "Saved Styles",
  variant = "list",
  maxVisible,
}: Readonly<SavedStylesProps>) {
  const [name, setName] = useState("");
  const visibleStyles = useMemo(
    () => (maxVisible ? styles.slice(0, maxVisible) : styles),
    [maxVisible, styles],
  );

  const saveDisabled = !name.trim();

  if (variant === "cards") {
    return (
      <Card size="small" title={title}>
        <Space direction="vertical" style={{ width: "100%" }} size={10}>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="Save current style as..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button
              variant="solid"
              disabled={saveDisabled}
              onClick={() => {
                onSaveStyle(name.trim());
                setName("");
              }}
            >
              Save
            </Button>
          </Space.Compact>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 8,
            }}
          >
            {visibleStyles.map((style) => (
              <Card
                key={style.id}
                size="small"
                style={{
                  cursor: "pointer",
                  borderColor:
                    selectedStyleId === style.id ? "#1677ff" : undefined,
                }}
                onClick={() => {
                  onSelectStyle(style.id);
                }}
              >
                <Space direction="vertical" size={2} style={{ width: "100%" }}>
                  <Space>
                    <Text strong>{style.name}</Text>
                    {style.isDefault ? <Tag color="blue">Default</Tag> : null}
                  </Space>
                  {style.description ? (
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {style.description}
                    </Text>
                  ) : null}
                  {onDeleteStyle && !style.isDefault ? (
                    <Button
                      size="small"
                      danger
                      variant="text"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteStyle(style.id);
                      }}
                    >
                      Delete
                    </Button>
                  ) : null}
                </Space>
              </Card>
            ))}
          </div>
        </Space>
      </Card>
    );
  }

  return (
    <Card size="small" title={title}>
      <Space direction="vertical" style={{ width: "100%" }} size={10}>
        <Space.Compact style={{ width: "100%" }}>
          <Input
            placeholder="Save current style as..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button
            variant="solid"
            disabled={saveDisabled}
            onClick={() => {
              onSaveStyle(name.trim());
              setName("");
            }}
          >
            Save
          </Button>
        </Space.Compact>

        <List
          dataSource={visibleStyles}
          rowKey="id"
          renderItem={(style) => (
            <List.Item
              style={{
                cursor: "pointer",
                background:
                  selectedStyleId === style.id
                    ? "rgba(22,119,255,0.08)"
                    : "transparent",
                borderRadius: 6,
                paddingInline: 8,
              }}
              onClick={() => {
                onSelectStyle(style.id);
              }}
              actions={
                onDeleteStyle && !style.isDefault
                  ? [
                      <Button
                        key={`delete-${style.id}`}
                        size="small"
                        danger
                        variant="text"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteStyle(style.id);
                        }}
                      >
                        Delete
                      </Button>,
                    ]
                  : undefined
              }
            >
              <Space direction="vertical" size={2}>
                <Space>
                  <Text strong>{style.name}</Text>
                  {style.isDefault ? <Tag color="blue">Default</Tag> : null}
                </Space>
                {style.description ? (
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {style.description}
                  </Text>
                ) : null}
              </Space>
            </List.Item>
          )}
        />
      </Space>
    </Card>
  );
}
