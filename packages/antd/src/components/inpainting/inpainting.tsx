import { Button, Card, Input, Space, Spin, Tag, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import type { InpaintingProps } from "@ai-ui/core";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

export function Inpainting({
  content,
  regions,
  onRegionSelect,
  onApply,
  selectedRegionId,
  isProcessing = false,
  prompt = "",
  onPromptChange,
  title,
  variant: _variant = "segment",
}: Readonly<InpaintingProps>) {
  return (
    <Card size="small" title={title ?? "Edit Region"}>
      <Paragraph style={{ fontSize: 13 }}>{content}</Paragraph>
      <div style={{ marginBottom: 12 }}>
        <Text
          type="secondary"
          style={{ fontSize: 12, display: "block", marginBottom: 8 }}
        >
          Select a region to edit:
        </Text>
        <Space wrap>
          {regions.map((region) => (
            <Tag
              key={region.id}
              color={selectedRegionId === region.id ? "blue" : undefined}
              style={{ cursor: "pointer" }}
              onClick={() => {
                onRegionSelect(region.id);
              }}
            >
              {selectedRegionId === region.id ? (
                <CheckOutlined style={{ marginRight: 4 }} />
              ) : null}
              {region.label ?? `Region ${region.id}`}
            </Tag>
          ))}
        </Space>
      </div>
      {selectedRegionId ? (
        <div>
          <TextArea
            rows={2}
            placeholder="Describe how to modify this region..."
            value={prompt}
            onChange={(e) => onPromptChange?.(e.target.value)}
            style={{ marginBottom: 8 }}
          />
          <Button
            type="primary"
            size="small"
            loading={isProcessing}
            onClick={() => {
              onApply(selectedRegionId, prompt);
            }}
          >
            Apply Changes
          </Button>
        </div>
      ) : null}
      {isProcessing ? (
        <div style={{ marginTop: 8, textAlign: "center" }}>
          <Spin size="small" />
          <Text type="secondary" style={{ fontSize: 12, marginLeft: 8 }}>
            Processing...
          </Text>
        </div>
      ) : null}
    </Card>
  );
}
