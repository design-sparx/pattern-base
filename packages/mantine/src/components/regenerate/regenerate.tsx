import { ActionIcon, Button, Menu, Tooltip } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

import type { RegenerateProps } from "@patternbase/core";

export function Regenerate({
  onRegenerate,
  isRegenerating = false,
  variant = "button",
  options,
}: RegenerateProps) {
  if (variant === "icon") {
    return (
      <Tooltip label="Regenerate">
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={onRegenerate}
          loading={isRegenerating}
        >
          <IconRefresh size={16} />
        </ActionIcon>
      </Tooltip>
    );
  }

  if (variant === "dropdown" && options && options.length > 0) {
    return (
      <Menu>
        <Menu.Target>
          <Button
            variant="default"
            leftSection={<IconRefresh size={14} />}
            loading={isRegenerating}
            size="sm"
          >
            Regenerate
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={onRegenerate}>Regenerate</Menu.Item>
          <Menu.Divider />
          {options.map((opt, i) => (
            <Menu.Item key={i} onClick={opt.onSelect}>
              {opt.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <Button
      variant="default"
      leftSection={<IconRefresh size={14} />}
      onClick={onRegenerate}
      loading={isRegenerating}
      size="sm"
    >
      Regenerate
    </Button>
  );
}
