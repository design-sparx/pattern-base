import { Alert, Button, Space } from "antd";

import type { NudgesProps } from "@ai-ui/core";

const typeMap: Record<string, "info" | "warning" | "success" | "error"> = {
  tip: "info",
  reminder: "warning",
  suggestion: "info",
};

export function Nudges({
  nudges,
  onDismiss,
  variant = "inline",
  maxVisible,
}: Readonly<NudgesProps>) {
  const visible = maxVisible ? nudges.slice(0, maxVisible) : nudges;

  return (
    <div
      style={
        variant === "toast"
          ? {
              position: "fixed",
              top: 16,
              right: 16,
              zIndex: 1050,
              maxWidth: 350,
            }
          : undefined
      }
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {visible.map((n) => (
          <Alert
            key={n.id}
            type={typeMap[n.type ?? "tip"] ?? "info"}
            closable={!!onDismiss}
            onClose={() => onDismiss?.(n.id)}
            message={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {n.icon ? <span>{n.icon}</span> : null}
                <span style={{ flex: 1, fontSize: 13 }}>{n.message}</span>
                {n.actionLabel && n.onAction ? (
                  <Button type="link" size="small" onClick={n.onAction}>
                    {n.actionLabel}
                  </Button>
                ) : null}
              </div>
            }
            showIcon={false}
          />
        ))}
      </Space>
    </div>
  );
}
