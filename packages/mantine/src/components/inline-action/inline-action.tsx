import { ActionIcon, Group, Tooltip } from "@mantine/core";

import type { InlineActionProps } from "@ai-ui/core";

export function InlineAction({
  actions,
  onAction,
  size = "medium",
}: InlineActionProps) {
  const iconSize = size === "small" ? 12 : 14;
  const actionIconSize = size === "small" ? "sm" : "md";

  return (
    <Group gap={4}>
      {actions.map((action) => (
        <Tooltip key={action.id} label={action.label} withArrow>
          <ActionIcon
            variant={action.type === "primary" ? "light" : "subtle"}
            color={
              action.type === "danger"
                ? "red"
                : action.type === "primary"
                  ? "violet"
                  : "gray"
            }
            size={actionIconSize}
            onClick={() => onAction(action.id)}
          >
            {typeof action.icon === "string" ? (
              <span style={{ fontSize: iconSize }}>{action.icon}</span>
            ) : action.icon ? (
              action.icon
            ) : (
              <span style={{ fontSize: iconSize }}>·</span>
            )}
          </ActionIcon>
        </Tooltip>
      ))}
    </Group>
  );
}
