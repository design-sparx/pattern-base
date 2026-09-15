import { Button, Card, List, Tag, Typography } from "antd";

import type { FootprintsProps } from "@patternbase/core";

const { Text } = Typography;

export function Footprints({
  entries,
  onEntryClick,
  onClear,
  title,
  maxVisible,
  showTimestamps = true,
  variant = "list",
}: Readonly<FootprintsProps>) {
  const visible = maxVisible ? entries.slice(0, maxVisible) : entries;

  return (
    <Card size="small">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        {title ? <Text strong>{title}</Text> : null}
        {onClear ? (
          <Button variant="link" size="small" onClick={onClear}>
            Clear history
          </Button>
        ) : null}
      </div>

      {variant === "compact" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {visible.map((e) => (
            <div
              key={e.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                cursor: onEntryClick ? "pointer" : undefined,
              }}
              onClick={() => onEntryClick?.(e.id)}
            >
              {showTimestamps ? (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {e.timestamp.toLocaleTimeString()}
                </Text>
              ) : null}
              <Text>{e.action}</Text>
              {e.model ? <Tag>{e.model}</Tag> : null}
            </div>
          ))}
        </div>
      ) : (
        <List
          size="small"
          dataSource={visible}
          renderItem={(e) => (
            <List.Item
              style={{ cursor: onEntryClick ? "pointer" : undefined }}
              onClick={() => onEntryClick?.(e.id)}
            >
              <List.Item.Meta
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 13 }}>{e.action}</Text>
                    {showTimestamps ? (
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {e.timestamp.toLocaleString()}
                      </Text>
                    ) : null}
                  </div>
                }
                description={
                  <div>
                    {e.model ? (
                      <Tag style={{ marginBottom: 4 }}>{e.model}</Tag>
                    ) : null}
                    {e.inputPreview ? (
                      <div>
                        <Text
                          type="secondary"
                          ellipsis
                          style={{ fontSize: 12 }}
                        >
                          In: {e.inputPreview}
                        </Text>
                      </div>
                    ) : null}
                    {e.outputPreview ? (
                      <div>
                        <Text
                          type="secondary"
                          ellipsis
                          style={{ fontSize: 12 }}
                        >
                          Out: {e.outputPreview}
                        </Text>
                      </div>
                    ) : null}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}
