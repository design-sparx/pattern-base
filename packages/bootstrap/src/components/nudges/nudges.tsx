import { Alert, Button } from "react-bootstrap";

import type { NudgesProps } from "@ai-ui/core";

const typeVariant: Record<string, string> = {
  tip: "info",
  reminder: "warning",
  suggestion: "primary",
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
      className={variant === "toast" ? "position-fixed end-0 p-3" : ""}
      style={
        variant === "toast"
          ? { top: 16, right: 16, zIndex: 1050, maxWidth: 350 }
          : undefined
      }
    >
      {visible.map((n) => (
        <Alert
          key={n.id}
          variant={typeVariant[n.type ?? "tip"] ?? "info"}
          dismissible={!!onDismiss}
          onClose={() => onDismiss?.(n.id)}
          className="mb-2"
        >
          <div className="d-flex align-items-center gap-2">
            {n.icon ? <span>{n.icon}</span> : null}
            <div className="flex-grow-1">
              <span className="small">{n.message}</span>
            </div>
            {n.actionLabel && n.onAction ? (
              <Button
                variant="link"
                size="sm"
                className="p-0"
                onClick={n.onAction}
              >
                {n.actionLabel}
              </Button>
            ) : null}
          </div>
        </Alert>
      ))}
    </div>
  );
}
