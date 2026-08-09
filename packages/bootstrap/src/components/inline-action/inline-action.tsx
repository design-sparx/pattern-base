import { Button } from "react-bootstrap";

import type { InlineActionProps } from "@patternbase/core";

const typeVariantMap: Record<string, string> = {
  primary: "primary",
  secondary: "outline-secondary",
  danger: "outline-danger",
};

export function InlineAction({
  actions,
  onAction,
  content,
  variant = "toolbar",
  size = "small",
}: Readonly<InlineActionProps>) {
  const btnSize = size === "small" ? "sm" : undefined;

  if (variant === "contextual" || variant === "floating") {
    return (
      <div className={variant === "floating" ? "position-relative" : ""}>
        {content ? <span className="small">{content}</span> : null}
        <div
          className="d-inline-flex ms-2 gap-1"
          style={
            variant === "floating"
              ? { position: "absolute", top: -4, right: 0 }
              : undefined
          }
        >
          {actions.map((a) => (
            <Button
              key={a.id}
              variant={
                typeVariantMap[a.type ?? "secondary"] ?? "outline-secondary"
              }
              size={btnSize}
              onClick={() => {
                onAction(a.id);
              }}
            >
              {a.icon ? <span className="me-1">{a.icon}</span> : null}
              {a.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-wrap gap-1 rounded border p-2">
      {actions.map((a) => (
        <Button
          key={a.id}
          variant={typeVariantMap[a.type ?? "secondary"] ?? "outline-secondary"}
          size={btnSize}
          onClick={() => {
            onAction(a.id);
          }}
        >
          {a.icon ? <span className="me-1">{a.icon}</span> : null}
          {a.label}
        </Button>
      ))}
    </div>
  );
}
