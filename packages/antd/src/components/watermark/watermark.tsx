import { SafetyCertificateOutlined } from "@ant-design/icons";
import { Alert, Button, Space, Tag, Typography } from "antd";

import type { WatermarkProps } from "@ai-ui/core";

const { Text } = Typography;

const DEFAULT_LABEL = "AI Provenance";

export function Watermark({
  label = DEFAULT_LABEL,
  visibility = "visible",
  variant = "badge",
  confidence,
  algorithm,
  onVerify,
}: Readonly<WatermarkProps>) {
  const modeLabel =
    visibility === "visible" ? "Visible watermark" : "Invisible watermark";
  const confidencePercent =
    confidence !== undefined ? Math.round(confidence * 100) : undefined;
  const confidenceLabel =
    confidencePercent !== undefined
      ? `Confidence: ${String(confidencePercent)}%`
      : undefined;

  if (variant === "inline") {
    return (
      <Text type="secondary" style={{ fontSize: 12 }}>
        <SafetyCertificateOutlined style={{ marginRight: 4 }} />
        {label} ({modeLabel}){confidenceLabel ? ` · ${confidenceLabel}` : null}
      </Text>
    );
  }

  if (variant === "banner") {
    return (
      <Alert
        type="info"
        showIcon
        icon={<SafetyCertificateOutlined />}
        message={label}
        description={
          <Space direction="vertical" size={2}>
            <Text>{modeLabel}</Text>
            {algorithm ? (
              <Text type="secondary" style={{ fontSize: 12 }}>
                Algorithm: {algorithm}
              </Text>
            ) : null}
            {confidenceLabel ? (
              <Text type="secondary" style={{ fontSize: 12 }}>
                {confidenceLabel}
              </Text>
            ) : null}
          </Space>
        }
        action={
          onVerify ? (
            <Button size="small" onClick={onVerify}>
              Verify
            </Button>
          ) : undefined
        }
      />
    );
  }

  return (
    <Space size={8}>
      <Tag color={visibility === "visible" ? "processing" : "default"}>
        {label}
      </Tag>
      <Text type="secondary" style={{ fontSize: 12 }}>
        {modeLabel}
      </Text>
      {confidenceLabel ? (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {confidenceLabel}
        </Text>
      ) : null}
      {onVerify ? (
        <Button size="small" type="link" onClick={onVerify}>
          Verify
        </Button>
      ) : null}
    </Space>
  );
}
