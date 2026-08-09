import { CheckOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Space, Spin, Typography } from "antd";

import type { SampleResponseProps } from "@patternbase/core";

const { Text, Paragraph } = Typography;

export function SampleResponse({
  sample,
  prompt,
  onGenerateSample,
  onRegenerateSample,
  onAcceptSample,
  isGenerating = false,
  title = "Sample Response",
  variant = "card",
}: Readonly<SampleResponseProps>) {
  if (variant === "inline") {
    return (
      <Space direction="vertical" size={6} style={{ width: "100%" }}>
        <Space>
          <Text strong>{title}</Text>
          <Button
            size="small"
            icon={<EyeOutlined />}
            loading={isGenerating}
            onClick={onGenerateSample}
          >
            Sample
          </Button>
        </Space>
        {sample ? <Text type="secondary">{sample}</Text> : null}
      </Space>
    );
  }

  return (
    <Card
      size="small"
      title={title}
      extra={
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            loading={isGenerating}
            onClick={onGenerateSample}
          >
            Sample
          </Button>
          {onRegenerateSample ? (
            <Button
              size="small"
              icon={<ReloadOutlined />}
              disabled={isGenerating}
              onClick={onRegenerateSample}
            >
              Regenerate
            </Button>
          ) : null}
          {onAcceptSample ? (
            <Button
              type="primary"
              size="small"
              icon={<CheckOutlined />}
              disabled={!sample || isGenerating}
              onClick={onAcceptSample}
            >
              Generate Full
            </Button>
          ) : null}
        </Space>
      }
    >
      {prompt ? (
        <Paragraph type="secondary" style={{ marginBottom: 8 }}>
          Prompt: {prompt}
        </Paragraph>
      ) : null}
      {isGenerating ? (
        <Space>
          <Spin size="small" />
          <Text type="secondary">Generating sample...</Text>
        </Space>
      ) : sample ? (
        <Paragraph style={{ marginBottom: 0 }}>{sample}</Paragraph>
      ) : (
        <Text type="secondary">
          Generate a short preview response before running the full output.
        </Text>
      )}
    </Card>
  );
}
