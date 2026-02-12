import { Button, List, Space, Tag, Typography } from "antd";

import type { FollowUpProps } from "@ai-ui/core";

const { Text } = Typography;

export function FollowUp({
  followUps,
  onSelect,
  variant = "chip",
  title,
  maxVisible,
}: Readonly<FollowUpProps>) {
  const visible = maxVisible ? followUps.slice(0, maxVisible) : followUps;

  if (variant === "list") {
    return (
      <div>
        {title ? (
          <Text strong style={{ display: "block", marginBottom: 8 }}>
            {title}
          </Text>
        ) : null}
        <List
          size="small"
          dataSource={visible}
          renderItem={(f) => (
            <List.Item
              style={{ cursor: "pointer" }}
              onClick={() => {
                onSelect(f);
              }}
            >
              {f.icon ? <span style={{ marginRight: 8 }}>{f.icon}</span> : null}
              {f.text}
            </List.Item>
          )}
        />
      </div>
    );
  }

  if (variant === "button") {
    return (
      <div>
        {title ? (
          <Text strong style={{ display: "block", marginBottom: 8 }}>
            {title}
          </Text>
        ) : null}
        <Space wrap>
          {visible.map((f) => (
            <Button
              key={f.id}
              type="dashed"
              size="small"
              onClick={() => {
                onSelect(f);
              }}
            >
              {f.icon ? <span style={{ marginRight: 4 }}>{f.icon}</span> : null}
              {f.text}
            </Button>
          ))}
        </Space>
      </div>
    );
  }

  return (
    <div>
      {title ? (
        <Text strong style={{ display: "block", marginBottom: 8 }}>
          {title}
        </Text>
      ) : null}
      <Space wrap>
        {visible.map((f) => (
          <Tag
            key={f.id}
            color="blue"
            style={{ cursor: "pointer", padding: "4px 12px" }}
            onClick={() => {
              onSelect(f);
            }}
          >
            {f.icon ? <span style={{ marginRight: 4 }}>{f.icon}</span> : null}
            {f.text}
          </Tag>
        ))}
      </Space>
    </div>
  );
}
