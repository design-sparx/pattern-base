import { Button, Card, Col, Row } from "react-bootstrap";

import type { InitialCtaProps } from "@patternbase/core";

export function InitialCta({
  title,
  subtitle,
  actions,
  onAction,
  variant = "centered",
}: Readonly<InitialCtaProps>) {
  if (variant === "minimal") {
    return (
      <div className="py-3 text-center">
        <h5>{title}</h5>
        {subtitle ? <p className="text-muted small">{subtitle}</p> : null}
        <div className="d-flex justify-content-center mt-2 flex-wrap gap-2">
          {actions.map((a) => (
            <Button
              key={a.id}
              variant="outline-primary"
              size="sm"
              onClick={() => {
                onAction(a);
              }}
            >
              {a.icon ? <span className="me-1">{a.icon}</span> : null}
              {a.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div>
        <div className="mb-3 text-center">
          <h5>{title}</h5>
          {subtitle ? <p className="text-muted small">{subtitle}</p> : null}
        </div>
        <Row xs={1} md={Math.min(actions.length, 3)} className="g-3">
          {actions.map((a) => (
            <Col key={a.id}>
              <Card
                className="h-100 text-center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onAction(a);
                }}
              >
                <Card.Body>
                  {a.icon ? <div className="fs-3 mb-2">{a.icon}</div> : null}
                  <Card.Title className="fs-6">{a.label}</Card.Title>
                  {a.description ? (
                    <Card.Text className="text-muted small">
                      {a.description}
                    </Card.Text>
                  ) : null}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className="py-4 text-center">
      <h4>{title}</h4>
      {subtitle ? <p className="text-muted">{subtitle}</p> : null}
      <div className="d-flex justify-content-center mt-3 flex-wrap gap-2">
        {actions.map((a, i) => (
          <Button
            key={a.id}
            variant={i === 0 ? "primary" : "outline-primary"}
            onClick={() => {
              onAction(a);
            }}
          >
            {a.icon ? <span className="me-1">{a.icon}</span> : null}
            {a.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
