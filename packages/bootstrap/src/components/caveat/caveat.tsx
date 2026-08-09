import { Alert } from "react-bootstrap";

import type { CaveatProps } from "@patternbase/core";

const severityVariant: Record<string, string> = {
  info: "info",
  warning: "warning",
  error: "danger",
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
      <span
        className={`text-${severity === "error" ? "danger" : severity === "warning" ? "warning" : "muted"} small`}
      >
        {message}
        {learnMoreUrl ? (
          <a
            href={learnMoreUrl}
            className="ms-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        ) : null}
      </span>
    );
  }

  return (
    <Alert
      variant={severityVariant[severity] ?? "info"}
      dismissible={dismissible}
      onClose={onDismiss}
    >
      {title ? <Alert.Heading className="fs-6">{title}</Alert.Heading> : null}
      {message}
      {learnMoreUrl ? (
        <Alert.Link
          href={learnMoreUrl}
          className="ms-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </Alert.Link>
      ) : null}
    </Alert>
  );
}
