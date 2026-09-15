import { Button, Card, List, Space, Tag, Typography } from "antd";

import type { DraftModeProps } from "@patternbase/core";

const { Text } = Typography;

export function DraftMode({
  drafts,
  activeDraftId,
  onSelectDraft,
  onRevertToDraft,
  onBranchFromDraft,
  title = "Draft Mode",
  variant = "list",
}: Readonly<DraftModeProps>) {
  return (
    <Card title={title} size="small">
      <List
        dataSource={drafts}
        rowKey="id"
        renderItem={(draft) => (
          <List.Item
            style={{
              cursor: "pointer",
              background:
                activeDraftId === draft.id
                  ? "rgba(22,119,255,0.08)"
                  : "transparent",
              borderRadius: 6,
              paddingInline: 8,
              marginLeft:
                variant === "timeline" ? Math.max(draft.number - 1, 0) * 8 : 0,
            }}
            onClick={() => {
              onSelectDraft(draft.id);
            }}
            actions={[
              <Button
                key={`revert-${draft.id}`}
                size="small"
                variant="text"
                onClick={(e) => {
                  e.stopPropagation();
                  onRevertToDraft(draft.id);
                }}
              >
                Revert
              </Button>,
              onBranchFromDraft ? (
                <Button
                  key={`branch-${draft.id}`}
                  size="small"
                  variant="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBranchFromDraft(draft.id);
                  }}
                >
                  Branch
                </Button>
              ) : null,
            ].filter(Boolean)}
          >
            <Space direction="vertical" size={2}>
              <Space>
                <Text strong>{draft.label ?? `Draft ${draft.number}`}</Text>
                {activeDraftId === draft.id ? (
                  <Tag color="blue">Active</Tag>
                ) : null}
              </Space>
              {draft.preview ? (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {draft.preview}
                </Text>
              ) : null}
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
}
