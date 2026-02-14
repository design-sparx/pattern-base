import { Button, Card, List, Progress, Space, Tag, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

import type { SynthesisProps } from "@ai-ui/core";

const { Text, Paragraph } = Typography;

const insightTypeColors: Record<string, string> = {
  fact: "green",
  inference: "orange",
  theme: "purple",
};

export function Synthesis({
  sources,
  insights,
  onSourceClick,
  onRegenerate,
  isProcessing = false,
  title,
  showSources = true,
  showConfidence = true,
  variant: _variant = "aggregated",
}: Readonly<SynthesisProps>) {
  return (
    <Card
      size="small"
      title={title ?? "Synthesis"}
      extra={
        onRegenerate ? (
          <Button
            size="small"
            icon={<ReloadOutlined />}
            loading={isProcessing}
            onClick={onRegenerate}
          >
            Regenerate
          </Button>
        ) : null
      }
    >
      <List
        size="small"
        dataSource={insights}
        renderItem={(insight) => (
          <List.Item>
            <div style={{ width: "100%" }}>
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
              >
                {insight.type ? (
                  <Tag
                    color={insightTypeColors[insight.type] ?? "default"}
                    style={{ fontSize: 11, flexShrink: 0 }}
                  >
                    {insight.type}
                  </Tag>
                ) : null}
                <Paragraph style={{ fontSize: 13, margin: 0, flex: 1 }}>
                  {insight.text}
                </Paragraph>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 4,
                }}
              >
                {showConfidence && insight.confidence != null ? (
                  <Progress
                    percent={Math.round(insight.confidence * 100)}
                    size="small"
                    style={{ width: 80 }}
                    strokeColor={
                      insight.confidence >= 0.8
                        ? "#52c41a"
                        : insight.confidence >= 0.5
                          ? "#faad14"
                          : "#ff4d4f"
                    }
                  />
                ) : null}
                {insight.sourceIds.length > 0 ? (
                  <Space size={2}>
                    {insight.sourceIds.map((sid) => {
                      const src = sources.find((s) => s.id === sid);
                      return src ? (
                        <Tag
                          key={sid}
                          style={{
                            fontSize: 10,
                            cursor: onSourceClick ? "pointer" : undefined,
                          }}
                          onClick={() => onSourceClick?.(sid)}
                        >
                          {src.title}
                        </Tag>
                      ) : null;
                    })}
                  </Space>
                ) : null}
              </div>
            </div>
          </List.Item>
        )}
      />
      {showSources && sources.length > 0 ? (
        <div style={{ marginTop: 12 }}>
          <Text
            type="secondary"
            style={{ fontSize: 12, display: "block", marginBottom: 8 }}
          >
            Sources ({sources.length})
          </Text>
          <Space direction="vertical" style={{ width: "100%" }} size={4}>
            {sources.map((src) => (
              <div
                key={src.id}
                style={{
                  padding: "4px 8px",
                  background: "#fafafa",
                  borderRadius: 4,
                  cursor: onSourceClick ? "pointer" : undefined,
                }}
                role={onSourceClick ? "button" : undefined}
                tabIndex={onSourceClick ? 0 : undefined}
                onClick={() => onSourceClick?.(src.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSourceClick?.(src.id);
                }}
              >
                <Text strong style={{ fontSize: 12 }}>
                  {src.title}
                </Text>
                {src.url ? (
                  <Text
                    type="secondary"
                    style={{ fontSize: 11, marginLeft: 8 }}
                  >
                    {src.url}
                  </Text>
                ) : null}
              </div>
            ))}
          </Space>
        </div>
      ) : null}
    </Card>
  );
}
