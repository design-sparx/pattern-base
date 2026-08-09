import { DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  List,
  Progress,
  Space,
  Tag,
  theme,
  Typography,
} from "antd";

import type { ReferencesProps } from "@patternbase/core";

const { Text } = Typography;

export function References({
  references,
  onSelectReference,
  onRemoveReference,
  title = "References",
  variant = "list",
  showRelevance = true,
}: Readonly<ReferencesProps>) {
  const { token } = theme.useToken();
  return (
    <Card size="small" title={title}>
      <List
        grid={variant === "cards" ? { gutter: 12, xs: 1, sm: 2 } : undefined}
        dataSource={references}
        rowKey="id"
        renderItem={(reference) => (
          <List.Item>
            <Space
              direction="vertical"
              size={6}
              style={{
                width: "100%",
                border:
                  variant === "cards"
                    ? `1px solid ${token.colorBorderSecondary}`
                    : "none",
                borderRadius: variant === "cards" ? 8 : 0,
                padding: variant === "cards" ? 12 : 0,
                background: reference.selected
                  ? "rgba(22,119,255,0.08)"
                  : "transparent",
                cursor: onSelectReference ? "pointer" : "default",
              }}
              onClick={() => {
                onSelectReference?.(reference.id);
              }}
            >
              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                <Space size={8}>
                  <Text strong>{reference.title}</Text>
                  {reference.type ? <Tag>{reference.type}</Tag> : null}
                </Space>
                {onRemoveReference ? (
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveReference(reference.id);
                    }}
                  />
                ) : null}
              </Space>
              {reference.location ? (
                <a
                  href={reference.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 12 }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <LinkOutlined /> {reference.location}
                </a>
              ) : null}
              {reference.excerpt ? (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {reference.excerpt}
                </Text>
              ) : null}
              {showRelevance && typeof reference.relevance === "number" ? (
                <Progress
                  size="small"
                  percent={Math.round(reference.relevance * 100)}
                  showInfo={false}
                />
              ) : null}
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
}
