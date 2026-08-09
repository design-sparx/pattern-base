import { EyeInvisibleOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Space, Switch, Tag, Typography } from "antd";

import type { IncognitoModeProps } from "@patternbase/core";

const { Text } = Typography;

const DEFAULT_DESCRIPTION_ON =
  "This private session is excluded from history and account memory.";
const DEFAULT_DESCRIPTION_OFF =
  "Session activity may be stored in history and used for future context.";
const DEFAULT_NOTICE =
  "Prompts, uploads, and outputs are discarded when the incognito session ends.";

export function IncognitoMode({
  enabled,
  onToggle,
  onEndSession,
  title = "Incognito Mode",
  description,
  retentionNotice,
  variant = "card",
}: Readonly<IncognitoModeProps>) {
  const statusLabel = enabled ? "Incognito On" : "Incognito Off";
  const summaryText =
    description ?? (enabled ? DEFAULT_DESCRIPTION_ON : DEFAULT_DESCRIPTION_OFF);
  const noticeText = retentionNotice ?? DEFAULT_NOTICE;

  if (variant === "inline") {
    return (
      <Space size={8}>
        <Tag
          color={enabled ? "green" : "default"}
          icon={<EyeInvisibleOutlined />}
        >
          {statusLabel}
        </Tag>
        {onToggle ? (
          <Switch
            size="small"
            checked={enabled}
            onChange={(checked) => {
              onToggle(checked);
            }}
          />
        ) : null}
        <Text type="secondary" style={{ fontSize: 12 }}>
          {summaryText}
        </Text>
      </Space>
    );
  }

  if (variant === "banner") {
    return (
      <Alert
        type={enabled ? "success" : "info"}
        showIcon
        icon={<EyeInvisibleOutlined />}
        message={title}
        description={
          <Space direction="vertical" size={2}>
            <Text>{summaryText}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {noticeText}
            </Text>
          </Space>
        }
        action={
          onToggle ? (
            <Switch
              checked={enabled}
              onChange={(checked) => {
                onToggle(checked);
              }}
            />
          ) : undefined
        }
      />
    );
  }

  return (
    <Card
      size="small"
      title={title}
      extra={
        onToggle ? (
          <Switch
            checked={enabled}
            onChange={(checked) => {
              onToggle(checked);
            }}
          />
        ) : null
      }
    >
      <Space direction="vertical" size={8} style={{ width: "100%" }}>
        <Tag
          color={enabled ? "green" : "default"}
          icon={<EyeInvisibleOutlined />}
        >
          {statusLabel}
        </Tag>
        <Text>{summaryText}</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {noticeText}
        </Text>
        {enabled && onEndSession ? (
          <Button size="small" onClick={onEndSession}>
            End Incognito Session
          </Button>
        ) : null}
      </Space>
    </Card>
  );
}
