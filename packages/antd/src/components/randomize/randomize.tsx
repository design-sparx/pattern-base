import { Button, Input, Space, Spin } from "antd";

import type { RandomizeProps } from "@patternbase/core";

export function Randomize({
  onRandomize,
  isRandomizing = false,
  currentSeed,
  onSeedChange,
  showSeed = false,
  label = "Randomize",
  variant = "button",
}: Readonly<RandomizeProps>) {
  const button = (
    <Button
      type={variant === "icon" ? "text" : "default"}
      size={variant === "fab" ? "large" : "small"}
      shape={variant === "fab" ? "circle" : undefined}
      onClick={onRandomize}
      disabled={isRandomizing}
      icon={isRandomizing ? <Spin size="small" /> : undefined}
    >
      {!isRandomizing ? (
        <>
          <span style={{ marginRight: variant !== "icon" ? 4 : 0 }}>
            {"\uD83C\uDFB2"}
          </span>
          {variant !== "icon" ? label : null}
        </>
      ) : null}
    </Button>
  );

  if (showSeed && onSeedChange) {
    return (
      <Space>
        {button}
        <Input
          size="small"
          addonBefore="Seed"
          value={currentSeed ?? ""}
          onChange={(e) => {
            onSeedChange(e.target.value);
          }}
          placeholder="auto"
          style={{ maxWidth: 200 }}
        />
      </Space>
    );
  }

  return button;
}
