import {
  Avatar as MantineAvatar,
  Badge,
  Card,
  Group,
  Stack,
  Text,
} from "@mantine/core";

import type { AvatarProps } from "@patternbase/core";

export function Avatar({
  name,
  persona,
  imageUrl,
  badgeLabel,
  status = "online",
  size = "medium",
  variant = "inline",
  onSelect,
}: AvatarProps) {
  const sizeMap = { small: "sm", medium: "md", large: "lg" } as const;
  const dotSize = { small: 8, medium: 10, large: 14 };
  const statusColor = {
    online: "var(--mantine-color-green-6)",
    idle: "var(--mantine-color-orange-6)",
    offline: "var(--mantine-color-gray-4)",
  };

  const avatarEl = (
    <div style={{ position: "relative", display: "inline-block" }}>
      <MantineAvatar
        src={imageUrl}
        name={name}
        size={sizeMap[size]}
        radius="xl"
        color="violet"
      />
      <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: dotSize[size],
            height: dotSize[size],
            borderRadius: "50%",
            backgroundColor: statusColor[status],
            border: "2px solid var(--mantine-color-body)",
          }}
        />
    </div>
  );

  if (variant === "compact") {
    return (
      <Group
        gap="xs"
        style={{ cursor: onSelect ? "pointer" : "default" }}
        onClick={onSelect}
      >
        {avatarEl}
        <Text size="sm" fw={500}>
          {name}
        </Text>
        {badgeLabel ? <Badge size="xs" variant="light">
            {badgeLabel}
          </Badge> : null}
      </Group>
    );
  }

  if (variant === "card") {
    return (
      <Card
        withBorder
        padding="md"
        style={{ cursor: onSelect ? "pointer" : "default" }}
        onClick={onSelect}
      >
        <Stack gap="sm" align="center" ta="center">
          {avatarEl}
          <Stack gap={4}>
            <Text fw={600}>{name}</Text>
            {persona ? <Text size="sm" c="dimmed">
                {persona}
              </Text> : null}
            {badgeLabel ? <Badge size="sm" variant="light">
                {badgeLabel}
              </Badge> : null}
          </Stack>
        </Stack>
      </Card>
    );
  }

  return (
    <Group
      gap="sm"
      align="center"
      style={{ cursor: onSelect ? "pointer" : "default" }}
      onClick={onSelect}
    >
      {avatarEl}
      <Stack gap={2}>
        <Text size="sm" fw={500}>
          {name}
        </Text>
        {persona ? <Text size="xs" c="dimmed">
            {persona}
          </Text> : null}
        {badgeLabel ? <Badge size="xs" variant="light">
            {badgeLabel}
          </Badge> : null}
      </Stack>
    </Group>
  );
}
