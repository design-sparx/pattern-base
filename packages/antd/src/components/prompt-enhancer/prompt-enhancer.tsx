import { Button, Card, Input, Space, Typography } from "antd";

import type { PromptEnhancerProps } from "@ai-ui/core";

const { Text } = Typography;

export function PromptEnhancer({
  prompt,
  enhancedPrompt,
  onEnhance,
  onApply,
  onEnhancedPromptChange,
  isEnhancing = false,
  title = "Prompt Enhancer",
  variant = "split",
  showDiff = true,
}: Readonly<PromptEnhancerProps>) {
  const value = enhancedPrompt ?? "";

  if (variant === "inline") {
    return (
      <Card size="small" title={title}>
        <Space direction="vertical" style={{ width: "100%" }} size={10}>
          <Input.TextArea
            value={prompt}
            autoSize={{ minRows: 2, maxRows: 5 }}
            readOnly
          />
          <Space>
            <Button
              size="small"
              type="primary"
              loading={isEnhancing}
              onClick={() => {
                onEnhance(prompt);
              }}
            >
              Enhance
            </Button>
            {onApply ? (
              <Button
                size="small"
                disabled={!value}
                onClick={() => {
                  onApply(value);
                }}
              >
                Apply
              </Button>
            ) : null}
          </Space>
          {value ? (
            <Input.TextArea
              value={value}
              autoSize={{ minRows: 2, maxRows: 6 }}
              onChange={(e) => {
                onEnhancedPromptChange?.(e.target.value);
              }}
              readOnly={!onEnhancedPromptChange}
            />
          ) : null}
        </Space>
      </Card>
    );
  }

  return (
    <Card size="small" title={title}>
      <Space direction="vertical" style={{ width: "100%" }} size={10}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          <div>
            <Text strong style={{ fontSize: 12 }}>
              Original
            </Text>
            <Input.TextArea
              value={prompt}
              autoSize={{ minRows: 3, maxRows: 7 }}
              readOnly
            />
          </div>
          <div>
            <Text strong style={{ fontSize: 12 }}>
              Enhanced
            </Text>
            <Input.TextArea
              value={value}
              placeholder="Enhanced prompt appears here"
              autoSize={{ minRows: 3, maxRows: 7 }}
              onChange={(e) => {
                onEnhancedPromptChange?.(e.target.value);
              }}
              readOnly={!onEnhancedPromptChange}
            />
          </div>
        </div>

        {showDiff && value ? (
          <Text type="secondary" style={{ fontSize: 12 }}>
            Diff preview: enhanced prompt adds context, constraints, and output
            format guidance.
          </Text>
        ) : null}

        <Space>
          <Button
            size="small"
            type="primary"
            loading={isEnhancing}
            onClick={() => {
              onEnhance(prompt);
            }}
          >
            Enhance
          </Button>
          {onApply ? (
            <Button
              size="small"
              disabled={!value}
              onClick={() => {
                onApply(value);
              }}
            >
              Apply Enhanced Prompt
            </Button>
          ) : null}
        </Space>
      </Space>
    </Card>
  );
}
