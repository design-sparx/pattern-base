import { Alert, Typography } from "antd";

import type { CaveatProps } from "@ai-ui/core";

const { Text, Link } = Typography;

const severityType: Record<string, "success" | "info" | "warning" | "error"> = {
  info: "info",
  warning: "warning",
  error: "error",
};

export function Caveat({
  message,
  variant = "banner",
  severity = "info",
  title,
  learnMoreUrl,
  dismissible = false,
  onDismiss,
}: Readonly<CaveatProps>) {
  if (variant === "inline") {
    return (
      <Text
        type={
          severity === "error"
            ? "danger"
            : severity === "warning"
              ? "warning"
              : "secondary"
        }
        style={{ fontSize: 13 }}
      >
        {message}
        {learnMoreUrl ? (
          <Link
            href={learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: 4 }}
          >
            Learn more
          </Link>
        ) : null}
      </Text>
    );
  }

  return (
    <Alert
      type={severityType[severity] ?? "info"}
      message={title ?? undefined}
      description={
        <span>
          {message}
          {learnMoreUrl ? (
            <Link
              href={learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: 4 }}
            >
              Learn more
            </Link>
          ) : null}
        </span>
      }
      closable={dismissible}
      onClose={onDismiss}
      showIcon
    />
  );
}
