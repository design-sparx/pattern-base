import { PlusOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Card, Input, List, Space, Tag, Typography } from "antd";
import { useState } from "react";

import type { SharedVisionProps } from "@ai-ui/core";

const { Text } = Typography;

const priorityColorMap = {
  high: "red",
  medium: "gold",
  low: "blue",
} as const;

export function SharedVision({
  participants,
  goals,
  context,
  onAddGoal,
  onSelectParticipant,
  title = "Shared Vision",
  variant = "board",
}: Readonly<SharedVisionProps>) {
  const [goalDraft, setGoalDraft] = useState("");

  return (
    <Card size="small" title={title}>
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Space wrap>
          {participants.map((participant) => (
            <Tag
              key={participant.id}
              icon={<TeamOutlined />}
              color={participant.isActive ? "green" : "default"}
              style={{ cursor: onSelectParticipant ? "pointer" : "default" }}
              onClick={() => {
                onSelectParticipant?.(participant.id);
              }}
            >
              {participant.name}
              {participant.role ? ` (${participant.role})` : ""}
            </Tag>
          ))}
        </Space>

        <Card size="small" type="inner" title="Goals">
          <List
            dataSource={goals}
            rowKey="id"
            renderItem={(goal) => (
              <List.Item>
                <Space>
                  <Text>{goal.text}</Text>
                  {goal.priority ? (
                    <Tag color={priorityColorMap[goal.priority]}>
                      {goal.priority}
                    </Tag>
                  ) : null}
                </Space>
              </List.Item>
            )}
          />
          {onAddGoal ? (
            <Space style={{ width: "100%", marginTop: 8 }}>
              <Input
                size="small"
                placeholder="Add shared goal..."
                value={goalDraft}
                onChange={(e) => {
                  setGoalDraft(e.target.value);
                }}
                onPressEnter={() => {
                  if (!goalDraft.trim()) return;
                  onAddGoal(goalDraft.trim());
                  setGoalDraft("");
                }}
              />
              <Button
                size="small"
                icon={<PlusOutlined />}
                onClick={() => {
                  if (!goalDraft.trim()) return;
                  onAddGoal(goalDraft.trim());
                  setGoalDraft("");
                }}
              >
                Add
              </Button>
            </Space>
          ) : null}
        </Card>

        <Card
          size="small"
          type="inner"
          title={variant === "compact" ? "Context" : "Shared Context"}
        >
          <List
            size="small"
            dataSource={context}
            rowKey="id"
            renderItem={(item) => (
              <List.Item>
                <Space direction="vertical" size={2}>
                  <Space>
                    <Text strong>{item.label}</Text>
                    {item.type ? <Tag>{item.type}</Tag> : null}
                  </Space>
                  <Text type="secondary">{item.value}</Text>
                </Space>
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </Card>
  );
}
