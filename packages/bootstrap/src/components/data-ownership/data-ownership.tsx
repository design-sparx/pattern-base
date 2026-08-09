import { Badge, Button, Card, ListGroup } from "react-bootstrap";

import type { DataOwnershipProps } from "@patternbase/core";

export function DataOwnership({
  items,
  onDelete,
  onExport,
  onDeleteAll,
  title,
  variant: _variant = "list",
}: Readonly<DataOwnershipProps>) {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {title ? (
            <Card.Title className="fs-6 mb-0">{title}</Card.Title>
          ) : null}
          <div className="d-flex gap-2">
            {onExport ? (
              <Button variant="outline-secondary" size="sm" onClick={onExport}>
                Export data
              </Button>
            ) : null}
            {onDeleteAll ? (
              <Button variant="outline-danger" size="sm" onClick={onDeleteAll}>
                Delete all
              </Button>
            ) : null}
          </div>
        </div>

        <ListGroup variant="flush">
          {items.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="fw-semibold small">{item.dataType}</div>
                {item.description ? (
                  <div className="text-muted small">{item.description}</div>
                ) : null}
                {item.retention ? (
                  <Badge bg="light" text="dark" className="mt-1">
                    Retention: {item.retention}
                  </Badge>
                ) : null}
              </div>
              {item.deletable && onDelete ? (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    onDelete(item.id);
                  }}
                >
                  Delete
                </Button>
              ) : null}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
