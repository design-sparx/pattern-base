import { Badge, Card, Col, Row } from "react-bootstrap";

import type { SuggestionsProps } from "@ai-ui/core";

export function Suggestions({
  suggestions,
  onSelect,
  columns = 2,
  variant = "card",
}: SuggestionsProps) {
  if (variant === "chip") {
    return (
      <div className="d-flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <Badge
            key={s.id}
            bg="primary"
            pill
            style={{
              cursor: "pointer",
              fontSize: "0.9em",
              padding: "8px 16px",
            }}
            onClick={() => {
              onSelect(s);
            }}
          >
            {s.icon ? <span className="me-1">{s.icon}</span> : null}
            {s.title}
          </Badge>
        ))}
      </div>
    );
  }

  return (
    <Row xs={1} md={columns} className="g-3">
      {suggestions.map((s) => (
        <Col key={s.id}>
          <Card
            className="h-100"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onSelect(s);
            }}
          >
            <Card.Body>
              <Card.Title className="fs-6">
                {s.icon ? <span className="me-2">{s.icon}</span> : null}
                {s.title}
              </Card.Title>
              {s.description ? (
                <Card.Text className="text-muted small">
                  {s.description}
                </Card.Text>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
