import { Alert, Badge, Button, Card, Stack } from "react-bootstrap";

import type { IncognitoModeProps } from "@patternbase/core";

const DEFAULT_DESCRIPTION_ON =
  "This private session is excluded from history and account memory.";
const DEFAULT_DESCRIPTION_OFF =
  "Session activity may be stored in history and used for future context.";
const DEFAULT_NOTICE =
  "Prompts, uploads, and outputs are discarded when the incognito session ends.";

export function IncognitoMode({
  enabled,
  onToggle,
  onEndSession,
  title = "Incognito Mode",
  description,
  retentionNotice,
  variant = "card",
}: Readonly<IncognitoModeProps>) {
  const statusLabel = enabled ? "Incognito On" : "Incognito Off";
  const summaryText =
    description ?? (enabled ? DEFAULT_DESCRIPTION_ON : DEFAULT_DESCRIPTION_OFF);
  const noticeText = retentionNotice ?? DEFAULT_NOTICE;

  if (variant === "inline") {
    return (
      <Stack
        direction="horizontal"
        gap={2}
        className="align-items-center flex-wrap"
      >
        <Badge bg={enabled ? "success" : "secondary"}>👁 {statusLabel}</Badge>
        {onToggle ? (
          <div className="form-check form-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={enabled}
              onChange={(e) => {
                onToggle(e.target.checked);
              }}
            />
          </div>
        ) : null}
        <small className="text-muted">{summaryText}</small>
      </Stack>
    );
  }

  if (variant === "banner") {
    return (
      <Alert
        variant={enabled ? "success" : "info"}
        className="d-flex align-items-start gap-3"
      >
        <span>👁</span>
        <div className="flex-grow-1">
          <strong>{title}</strong>
          <p className="small mb-1">{summaryText}</p>
          <small className="text-muted">{noticeText}</small>
        </div>
        {onToggle ? (
          <div className="form-check form-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={enabled}
              onChange={(e) => {
                onToggle(e.target.checked);
              }}
            />
          </div>
        ) : null}
      </Alert>
    );
  }

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="fs-6 mb-0">{title}</Card.Title>
          {onToggle ? (
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={enabled}
                onChange={(e) => {
                  onToggle(e.target.checked);
                }}
              />
            </div>
          ) : null}
        </div>
        <Stack gap={2}>
          <Badge
            bg={enabled ? "success" : "secondary"}
            className="align-self-start"
          >
            👁 {statusLabel}
          </Badge>
          <p className="small mb-0">{summaryText}</p>
          <small className="text-muted">{noticeText}</small>
          {enabled && onEndSession ? (
            <div>
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={onEndSession}
              >
                End Incognito Session
              </Button>
            </div>
          ) : null}
        </Stack>
      </Card.Body>
    </Card>
  );
}
