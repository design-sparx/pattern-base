import { Button, Space, Typography } from "antd";

import type { InlineActionProps } from "@ai-ui/core";

const { Text } = Typography;

const typeMap: Record<
  string,
  "primary" | "default" | "dashed" | "text" | "link"
> = {
  primary: "primary",
  secondary: "default",
  danger: "default",
};

export function InlineAction({
  actions,
  onAction,
  content,
  variant = "toolbar",
  size = "small",
}: Readonly<InlineActionProps>) {
  const btnSize = size === "small" ? "small" : "middle";

  if (variant === "contextual" || variant === "floating") {
    return (
      <div
        style={{ position: variant === "floating" ? "relative" : undefined }}
      >
        {content ? <Text style={{ fontSize: 13 }}>{content}</Text> : null}
        <Space
          size={4}
          style={
            variant === "floating"
              ? { position: "absolute", top: -4, right: 0 }
              : { marginLeft: 8, display: "inline-flex" }
          }
        >
          {actions.map((a) => (
            <Button
              key={a.id}
              type={typeMap[a.type ?? "secondary"]}
              danger={a.type === "danger"}
              size={btnSize}
              onClick={() => {
                onAction(a.id);
              }}
            >
              {a.icon ? <span style={{ marginRight: 4 }}>{a.icon}</span> : null}
              {a.label}
            </Button>
          ))}
        </Space>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        border: "1px solid #d9d9d9",
        borderRadius: 6,
        padding: 8,
      }}
    >
      {actions.map((a) => (
        <Button
          key={a.id}
          type={typeMap[a.type ?? "secondary"]}
          danger={a.type === "danger"}
          size={btnSize}
          onClick={() => {
            onAction(a.id);
          }}
        >
          {a.icon ? <span style={{ marginRight: 4 }}>{a.icon}</span> : null}
          {a.label}
        </Button>
      ))}
    </div>
  );
}
