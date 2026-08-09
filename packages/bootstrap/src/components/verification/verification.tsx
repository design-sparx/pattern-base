import {
  Badge,
  Button,
  Card,
  ListGroup,
  ProgressBar,
  Stack,
} from "react-bootstrap";

import type { VerificationProps } from "@patternbase/core";

const statusBadgeMap = {
  verified: "success",
  uncertain: "warning",
  disputed: "danger",
} as const;

export function Verification({
  claims,
  onRunVerification,
  onSelectClaim,
  title = "Verification",
  showSources = true,
  variant = "list",
}: Readonly<VerificationProps>) {
  if (variant === "inline") {
    return (
      <Stack gap={2}>
        <div className="d-flex align-items-center gap-2">
          <strong>{title}</strong>
          {onRunVerification ? (
            <Button size="sm" onClick={onRunVerification}>
              Verify
            </Button>
          ) : null}
        </div>
        {claims.map((claim) => (
          <small key={claim.id} className="text-muted">
            {claim.text} ({Math.round(claim.confidence * 100)}%)
          </small>
        ))}
      </Stack>
    );
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">{title}</h6>
        {onRunVerification ? (
          <Button size="sm" onClick={onRunVerification}>
            Run Verification
          </Button>
        ) : null}
      </Card.Header>
      <ListGroup variant="flush">
        {claims.map((claim) => (
          <ListGroup.Item
            key={claim.id}
            action={Boolean(onSelectClaim)}
            onClick={() => {
              onSelectClaim?.(claim.id);
            }}
          >
            <Stack gap={1}>
              <div className="d-flex align-items-center flex-wrap gap-2">
                <span className="small">{claim.text}</span>
                {claim.status ? (
                  <Badge bg={statusBadgeMap[claim.status]}>
                    {claim.status}
                  </Badge>
                ) : null}
              </div>
              <ProgressBar
                now={Math.round(claim.confidence * 100)}
                style={{ height: 6 }}
              />
              {showSources && claim.source ? (
                claim.url ? (
                  <a
                    href={claim.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="small text-decoration-none"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Source: {claim.source}
                  </a>
                ) : (
                  <small className="text-muted">Source: {claim.source}</small>
                )
              ) : null}
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
