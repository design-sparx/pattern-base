import { Button, Card, Spinner } from "react-bootstrap";

import type { RestructureProps } from "@ai-ui/core";

export function Restructure({
  content,
  options,
  onRestructure,
  restructuredContent,
  isProcessing = false,
  showDiff = false,
  title,
  variant: _variant = "buttons",
}: Readonly<RestructureProps>) {
  const displayContent = restructuredContent ?? content;

  return (
    <Card>
      <Card.Body>
        <Card.Title className="fs-6">{title ?? "Restructure"}</Card.Title>
        <p className="small">{displayContent}</p>
        {showDiff && restructuredContent ? (
          <div
            className="mb-3 rounded p-2"
            style={{
              background: "var(--bs-success-bg-subtle)",
              border: "1px solid var(--bs-success-border-subtle)",
            }}
          >
            <small className="text-muted d-block">Original:</small>
            <p
              className="small text-muted mb-0"
              style={{ textDecoration: "line-through" }}
            >
              {content}
            </p>
          </div>
        ) : null}
        <div className="d-flex flex-wrap gap-2">
          {options.map((opt) => (
            <Button
              key={opt.id}
              variant="outline-secondary"
              size="sm"
              disabled={isProcessing}
              onClick={() => {
                onRestructure(opt.id);
              }}
            >
              {opt.icon ? <span className="me-1">{opt.icon}</span> : null}
              {opt.label}
            </Button>
          ))}
          {isProcessing ? <Spinner animation="border" size="sm" /> : null}
        </div>
      </Card.Body>
    </Card>
  );
}
