import { SafetyCertificateOutlined } from "@ant-design/icons";
import { Button, Card, List, Progress, Space, Tag, Typography } from "antd";

import type { VerificationProps } from "@ai-ui/core";

const { Text } = Typography;

const statusColorMap = {
  verified: "green",
  uncertain: "gold",
  disputed: "red",
} as const;

export function Verification({
  claims,
  onRunVerification,
  onSelectClaim,
  title = "Verification",
  showSources = true,
  variant = "list",
}: Readonly<VerificationProps>) {
  if (variant === "inline") {
    return (
      <Space direction="vertical" size={8} style={{ width: "100%" }}>
        <Space>
          <Text strong>{title}</Text>
          {onRunVerification ? (
            <Button
              size="small"
              icon={<SafetyCertificateOutlined />}
              onClick={onRunVerification}
            >
              Verify
            </Button>
          ) : null}
        </Space>
        {claims.map((claim) => (
          <Text key={claim.id} type="secondary">
            {claim.text} ({Math.round(claim.confidence * 100)}%)
          </Text>
        ))}
      </Space>
    );
  }

  return (
    <Card
      size="small"
      title={title}
      extra={
        onRunVerification ? (
          <Button
            size="small"
            icon={<SafetyCertificateOutlined />}
            onClick={onRunVerification}
          >
            Run Verification
          </Button>
        ) : null
      }
    >
      <List
        dataSource={claims}
        rowKey="id"
        renderItem={(claim) => (
          <List.Item
            style={{ cursor: onSelectClaim ? "pointer" : "default" }}
            onClick={() => {
              onSelectClaim?.(claim.id);
            }}
          >
            <Space direction="vertical" size={6} style={{ width: "100%" }}>
              <Space>
                <Text>{claim.text}</Text>
                {claim.status ? (
                  <Tag color={statusColorMap[claim.status]}>{claim.status}</Tag>
                ) : null}
              </Space>
              <Progress
                percent={Math.round(claim.confidence * 100)}
                size="small"
              />
              {showSources && claim.source ? (
                claim.url ? (
                  <a
                    href={claim.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{ fontSize: 12 }}
                  >
                    Source: {claim.source}
                  </a>
                ) : (
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Source: {claim.source}
                  </Text>
                )
              ) : null}
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
}
