import { Alert, Badge, Button, Card, FormCheck, Stack } from "react-bootstrap";

import type { IncognitoModeProps } from "@ai-ui/core";

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
        className="align-items-center flex-wrap gap-2"
      >
        <Badge bg={enabled ? "success" : "secondary"}>{statusLabel}</Badge>
        {onToggle ? (
          <FormCheck
            type="switch"
            id="incognito-inline-toggle"
            checked={enabled}
            onChange={(event) => {
              onToggle(event.currentTarget.checked);
            }}
            label="Private session"
          />
        ) : null}
        <small className="text-muted">{summaryText}</small>
      </Stack>
    );
  }

  if (variant === "banner") {
    return (
      <Alert
        variant={enabled ? "success" : "info"}
        className="d-flex align-items-start justify-content-between mb-0 gap-3"
      >
        <div>
          <div className="fw-semibold">{title}</div>
          <div className="small">{summaryText}</div>
          <small className="text-muted">{noticeText}</small>
        </div>
        {onToggle ? (
          <FormCheck
            type="switch"
            id="incognito-banner-toggle"
            checked={enabled}
            onChange={(event) => {
              onToggle(event.currentTarget.checked);
            }}
            label=""
          />
        ) : null}
      </Alert>
    );
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">{title}</h6>
        {onToggle ? (
          <FormCheck
            type="switch"
            id="incognito-card-toggle"
            checked={enabled}
            onChange={(event) => {
              onToggle(event.currentTarget.checked);
            }}
            label=""
          />
        ) : null}
      </Card.Header>
      <Card.Body>
        <Stack gap={2}>
          <div>
            <Badge bg={enabled ? "success" : "secondary"}>{statusLabel}</Badge>
          </div>
          <div className="small">{summaryText}</div>
          <small className="text-muted">{noticeText}</small>
          {enabled && onEndSession ? (
            <div>
              <Button size="sm" variant="outline-danger" onClick={onEndSession}>
                End Incognito Session
              </Button>
            </div>
          ) : null}
        </Stack>
      </Card.Body>
    </Card>
  );
}
