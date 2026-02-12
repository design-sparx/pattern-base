import { Badge, Button, Card, ListGroup } from "react-bootstrap";

import type { FootprintsProps } from "@ai-ui/core";

export function Footprints({
  entries,
  onEntryClick,
  onClear,
  title,
  maxVisible,
  showTimestamps = true,
  variant = "list",
}: Readonly<FootprintsProps>) {
  const visible = maxVisible ? entries.slice(0, maxVisible) : entries;

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          {title ? (
            <Card.Title className="fs-6 mb-0">{title}</Card.Title>
          ) : null}
          {onClear ? (
            <Button variant="link" size="sm" onClick={onClear}>
              Clear history
            </Button>
          ) : null}
        </div>

        {variant === "compact" ? (
          <div className="d-flex flex-column gap-1">
            {visible.map((e) => (
              <div
                key={e.id}
                className="small d-flex align-items-center gap-2"
                style={{ cursor: onEntryClick ? "pointer" : undefined }}
                onClick={() => onEntryClick?.(e.id)}
              >
                <span className="text-muted">
                  {showTimestamps ? e.timestamp.toLocaleTimeString() : null}
                </span>
                <span>{e.action}</span>
                {e.model ? <Badge bg="secondary">{e.model}</Badge> : null}
              </div>
            ))}
          </div>
        ) : (
          <ListGroup variant="flush">
            {visible.map((e) => (
              <ListGroup.Item
                key={e.id}
                action={!!onEntryClick}
                onClick={() => onEntryClick?.(e.id)}
              >
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold small">{e.action}</span>
                  {showTimestamps ? (
                    <small className="text-muted">
                      {e.timestamp.toLocaleString()}
                    </small>
                  ) : null}
                </div>
                {e.model ? (
                  <Badge bg="secondary" className="me-1 mt-1">
                    {e.model}
                  </Badge>
                ) : null}
                {e.inputPreview ? (
                  <div className="text-muted small text-truncate mt-1">
                    In: {e.inputPreview}
                  </div>
                ) : null}
                {e.outputPreview ? (
                  <div className="text-muted small text-truncate">
                    Out: {e.outputPreview}
                  </div>
                ) : null}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}
