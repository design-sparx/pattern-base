import { Button, Card, List, Space, Tag, Typography } from "antd";

import type { BranchesProps } from "@ai-ui/core";

const { Text } = Typography;

export function Branches({
  branches,
  activeBranchId,
  onSelectBranch,
  onCreateBranch,
  title = "Branches",
  variant = "tree",
}: Readonly<BranchesProps>) {
  return (
    <Card size="small" title={title}>
      <List
        dataSource={branches}
        rowKey="id"
        renderItem={(branch) => (
          <List.Item
            style={{
              cursor: "pointer",
              background:
                activeBranchId === branch.id
                  ? "rgba(22,119,255,0.08)"
                  : "transparent",
              borderRadius: 6,
              paddingInline: 8,
              marginLeft: variant === "tree" ? (branch.depth ?? 0) * 16 : 0,
            }}
            onClick={() => {
              onSelectBranch(branch.id);
            }}
            actions={[
              <Button
                key={`branch-${branch.id}`}
                size="small"
                type="text"
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateBranch(branch.id);
                }}
              >
                Branch
              </Button>,
            ]}
          >
            <Space direction="vertical" size={2}>
              <Space>
                <Text strong>{branch.label}</Text>
                {activeBranchId === branch.id ? (
                  <Tag color="blue">Active</Tag>
                ) : null}
              </Space>
              {branch.preview ? (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {branch.preview}
                </Text>
              ) : null}
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
}
