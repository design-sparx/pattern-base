import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Input, List, Space, Tag, Typography } from "antd";
import { useState } from "react";

import type { MemoryProps } from "@ai-ui/core";

const { Text } = Typography;

export function Memory({
  memories,
  onEditMemory,
  onDeleteMemory,
  title = "Memory",
  variant = "list",
  showTimestamps = true,
}: Readonly<MemoryProps>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState("");

  return (
    <Card size="small" title={title}>
      <List
        grid={variant === "cards" ? { gutter: 12, xs: 1, sm: 2 } : undefined}
        dataSource={memories}
        rowKey="id"
        renderItem={(memory) => {
          const isEditing = editingId === memory.id;
          return (
            <List.Item>
              <Space
                direction="vertical"
                size={6}
                style={{
                  width: "100%",
                  border: variant === "cards" ? "1px solid #f0f0f0" : "none",
                  borderRadius: variant === "cards" ? 8 : 0,
                  padding: variant === "cards" ? 12 : 0,
                }}
              >
                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Space size={8}>
                    <Text strong>{memory.label}</Text>
                    {memory.category ? <Tag>{memory.category}</Tag> : null}
                    {memory.locked ? <Tag color="orange">Locked</Tag> : null}
                  </Space>
                  <Space size={4}>
                    {isEditing ? (
                      <Button
                        type="text"
                        size="small"
                        icon={<SaveOutlined />}
                        onClick={() => {
                          onEditMemory(memory.id, draftValue);
                          setEditingId(null);
                          setDraftValue("");
                        }}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => {
                          setEditingId(memory.id);
                          setDraftValue(memory.value);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      disabled={memory.locked}
                      onClick={() => {
                        onDeleteMemory(memory.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Space>
                </Space>
                {isEditing ? (
                  <Input.TextArea
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    value={draftValue}
                    onChange={(e) => {
                      setDraftValue(e.target.value);
                    }}
                  />
                ) : (
                  <Text type="secondary">{memory.value}</Text>
                )}
                {showTimestamps && memory.updatedAt ? (
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Updated: {memory.updatedAt.toLocaleString()}
                  </Text>
                ) : null}
              </Space>
            </List.Item>
          );
        }}
      />
    </Card>
  );
}
