import { Badge, Button, Card } from "react-bootstrap";

import type { DescribeProps } from "@patternbase/core";

export function Describe({
  output,
  details,
  inferredPrompt,
  model,
  seed,
  onReuse,
  onCopy,
  title,
  variant = "panel",
}: Readonly<DescribeProps>) {
  if (variant === "inline") {
    return (
      <div>
        {title ? <h6>{title}</h6> : null}
        <div className="bg-body-secondary mb-2 rounded p-2">
          <p className="small mb-0">{output}</p>
        </div>
        {inferredPrompt ? (
          <div className="mb-2">
            <small className="text-muted d-block">Inferred prompt:</small>
            <code className="small" style={{ color: "var(--bs-body-color)" }}>
              {inferredPrompt}
            </code>
          </div>
        ) : null}
        <div className="d-flex flex-wrap gap-1">
          {details.map((d) => (
            <Badge key={d.id} bg="light" text="dark" className="fw-normal">
              {d.label}: {d.value}
            </Badge>
          ))}
          {model ? <Badge bg="primary">{model}</Badge> : null}
          {seed ? <Badge bg="secondary">Seed: {seed}</Badge> : null}
        </div>
      </div>
    );
  }

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="fs-6">{title ?? "Describe Output"}</Card.Title>
          <div className="d-flex gap-1">
            {onCopy ? (
              <Button variant="outline-secondary" size="sm" onClick={onCopy}>
                Copy
              </Button>
            ) : null}
            {onReuse && inferredPrompt ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onReuse(inferredPrompt);
                }}
              >
                Reuse Prompt
              </Button>
            ) : null}
          </div>
        </div>
        <p className="small">{output}</p>
        {inferredPrompt ? (
          <div className="mb-3">
            <small className="text-muted d-block mb-1">Inferred Prompt</small>
            <code
              className="small d-block bg-body-secondary rounded p-2"
              style={{ color: "var(--bs-body-color)", fontFamily: "monospace" }}
            >
              {inferredPrompt}
            </code>
          </div>
        ) : null}
        <div className="d-flex flex-wrap gap-1">
          {details.map((d) => (
            <Badge
              key={d.id}
              bg={d.type === "code" ? "info" : "light"}
              text={d.type === "code" ? "white" : "dark"}
              className="fw-normal"
            >
              {d.label}: <strong>{d.value}</strong>
            </Badge>
          ))}
          {model ? <Badge bg="primary">{model}</Badge> : null}
          {seed ? <Badge bg="secondary">Seed: {seed}</Badge> : null}
        </div>
      </Card.Body>
    </Card>
  );
}
