import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";

import type { RegenerateProps } from "@patternbase/core";

export function Regenerate({
  onRegenerate,
  isRegenerating = false,
  variant = "button",
  options,
}: RegenerateProps) {
  if (variant === "dropdown" && options && options.length > 0) {
    const items = [
      { key: "regen", label: "Regenerate response", onClick: onRegenerate },
      { type: "divider" as const },
      ...options.map((opt, i) => ({
        key: `opt-${String(i)}`,
        label: opt.label,
        onClick: opt.onSelect,
      })),
    ];

    return (
      <Dropdown menu={{ items }} disabled={isRegenerating}>
        <Button
          icon={isRegenerating ? <LoadingOutlined /> : <ReloadOutlined />}
          loading={isRegenerating}
        >
          {isRegenerating ? "Regenerating..." : "Regenerate"}
        </Button>
      </Dropdown>
    );
  }

  if (variant === "icon") {
    return (
      <Button
        variant="text"
        size="small"
        icon={isRegenerating ? <LoadingOutlined /> : <ReloadOutlined />}
        onClick={onRegenerate}
        disabled={isRegenerating}
        title="Regenerate"
      />
    );
  }

  return (
    <Button
      icon={isRegenerating ? <LoadingOutlined /> : <ReloadOutlined />}
      onClick={onRegenerate}
      disabled={isRegenerating}
      loading={isRegenerating}
    >
      {isRegenerating ? "Regenerating..." : "Regenerate"}
    </Button>
  );
}
