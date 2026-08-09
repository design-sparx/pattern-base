import { Alert, Badge, Button, Stack } from "react-bootstrap";

import type { WatermarkProps } from "@patternbase/core";

const DEFAULT_LABEL = "AI Provenance";

export function Watermark({
  label = DEFAULT_LABEL,
  visibility = "visible",
  variant = "badge",
  confidence,
  algorithm,
  onVerify,
}: Readonly<WatermarkProps>) {
  const modeLabel =
    visibility === "visible" ? "Visible watermark" : "Invisible watermark";
  const confidencePercent =
    confidence !== undefined ? Math.round(confidence * 100) : undefined;
  const confidenceLabel =
    confidencePercent !== undefined
      ? `Confidence: ${String(confidencePercent)}%`
      : undefined;

  if (variant === "inline") {
    return (
      <small className="text-muted">
        {label} ({modeLabel}){confidenceLabel ? ` · ${confidenceLabel}` : null}
      </small>
    );
  }

  if (variant === "banner") {
    return (
      <Alert
        variant="info"
        className="d-flex align-items-start justify-content-between mb-0 gap-3"
      >
        <div>
          <div className="fw-semibold">{label}</div>
          <div className="small">{modeLabel}</div>
          {algorithm ? (
            <small className="text-muted d-block">Algorithm: {algorithm}</small>
          ) : null}
          {confidenceLabel ? (
            <small className="text-muted d-block">{confidenceLabel}</small>
          ) : null}
        </div>
        {onVerify ? (
          <Button size="sm" variant="outline-primary" onClick={onVerify}>
            Verify
          </Button>
        ) : null}
      </Alert>
    );
  }

  return (
    <Stack
      direction="horizontal"
      className="align-items-center flex-wrap gap-2"
    >
      <Badge bg={visibility === "visible" ? "info" : "secondary"}>
        {label}
      </Badge>
      <small className="text-muted">{modeLabel}</small>
      {confidenceLabel ? (
        <small className="text-muted">{confidenceLabel}</small>
      ) : null}
      {onVerify ? (
        <Button size="sm" variant="link" onClick={onVerify}>
          Verify
        </Button>
      ) : null}
    </Stack>
  );
}
