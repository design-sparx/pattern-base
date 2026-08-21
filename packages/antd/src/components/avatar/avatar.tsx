import {
  Avatar as AntAvatar,
  Badge,
  Button,
  Card,
  Space,
  Tag,
  Typography,
} from "antd";

import type { AvatarProps } from "@patternbase/core";

const { Text } = Typography;

const statusColorMap = {
  online: "green",
  idle: "gold",
  offline: "default",
} as const;

const sizeMap = {
  small: 28,
  medium: 36,
  large: 48,
} as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.trim().charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({
  name,
  persona,
  imageUrl,
  badgeLabel,
  status = "online",
  size = "medium",
  variant = "inline",
  onSelect,
}: Readonly<AvatarProps>) {
  const avatarNode = (
    <Badge dot color={statusColorMap[status]}>
      <AntAvatar src={imageUrl} size={sizeMap[size]}>
        {getInitials(name)}
      </AntAvatar>
    </Badge>
  );

  if (variant === "compact") {
    return (
      <Space size={8}>
        {avatarNode}
        <Space direction="vertical" size={0}>
          <Text strong style={{ lineHeight: 1.1 }}>
            {name}
          </Text>
          {persona ? (
            <Text type="secondary" style={{ fontSize: 12 }}>
              {persona}
            </Text>
          ) : null}
        </Space>
        {badgeLabel ? <Tag>{badgeLabel}</Tag> : null}
      </Space>
    );
  }

  if (variant === "card") {
    return (
      <Card size="small">
        <Space direction="vertical" size={10} style={{ width: "100%" }}>
          <Space size={10}>
            {avatarNode}
            <Space direction="vertical" size={0}>
              <Text strong>{name}</Text>
              {persona ? <Text type="secondary">{persona}</Text> : null}
            </Space>
          </Space>
          <Space>
            {badgeLabel ? <Tag>{badgeLabel}</Tag> : null}
            <Tag color={statusColorMap[status]}>{status}</Tag>
            {onSelect ? (
              <Button size="small" type="link" onClick={onSelect}>
                View profile
              </Button>
            ) : null}
          </Space>
        </Space>
      </Card>
    );
  }

  return (
    <Space size={8}>
      {avatarNode}
      <Space direction="vertical" size={0}>
        <Text>{name}</Text>
        {persona ? (
          <Text type="secondary" style={{ fontSize: 12 }}>
            {persona}
          </Text>
        ) : null}
      </Space>
      {badgeLabel ? <Tag>{badgeLabel}</Tag> : null}
    </Space>
  );
}
