import { Button, Card, Form, Spinner } from "react-bootstrap";

import type { RestyleProps } from "@patternbase/core";

export function Restyle({
  content,
  options,
  onRestyle,
  restyledContent,
  isProcessing = false,
  intensity,
  onIntensityChange,
  title,
  variant = "presets",
}: Readonly<RestyleProps>) {
  const displayContent = restyledContent ?? content;

  if (variant === "gallery") {
    return (
      <Card>
        <Card.Body>
          <Card.Title className="fs-6">{title ?? "Restyle"}</Card.Title>
          <p className="small">{displayContent}</p>
          <div
            className="d-grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            }}
          >
            {options.map((opt) => (
              <Button
                key={opt.id}
                variant="outline-secondary"
                size="sm"
                disabled={isProcessing}
                className="text-start"
                style={{ whiteSpace: "normal" }}
                onClick={() => {
                  onRestyle(opt.id);
                }}
              >
                {opt.icon ? (
                  <span className="d-block mb-1" style={{ fontSize: 18 }}>
                    {opt.icon}
                  </span>
                ) : null}
                <strong className="d-block small">{opt.label}</strong>
                {opt.description ? (
                  <small className="text-muted">{opt.description}</small>
                ) : null}
              </Button>
            ))}
          </div>
          {isProcessing ? (
            <div className="mt-2 text-center">
              <Spinner animation="border" size="sm" />
            </div>
          ) : null}
        </Card.Body>
      </Card>
    );
  }

  if (variant === "slider") {
    return (
      <Card>
        <Card.Body>
          <Card.Title className="fs-6">{title ?? "Restyle"}</Card.Title>
          <p className="small">{displayContent}</p>
          {options.length > 0 ? (
            <div className="d-flex mb-3 flex-wrap gap-1">
              {options.map((opt) => (
                <Button
                  key={opt.id}
                  variant="outline-secondary"
                  size="sm"
                  disabled={isProcessing}
                  onClick={() => {
                    onRestyle(opt.id);
                  }}
                >
                  {opt.icon ? <span className="me-1">{opt.icon}</span> : null}
                  {opt.label}
                </Button>
              ))}
            </div>
          ) : null}
          {onIntensityChange ? (
            <Form.Group>
              <Form.Label className="small text-muted">Intensity</Form.Label>
              <Form.Range
                min={0}
                max={100}
                value={intensity ?? 50}
                onChange={(e) => {
                  onIntensityChange(Number(e.target.value));
                }}
                disabled={isProcessing}
              />
            </Form.Group>
          ) : null}
          {isProcessing ? (
            <div className="mt-2 text-center">
              <Spinner animation="border" size="sm" />
            </div>
          ) : null}
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title className="fs-6">{title ?? "Restyle"}</Card.Title>
        <p className="small">{displayContent}</p>
        <div className="d-flex flex-wrap gap-2">
          {options.map((opt) => (
            <Button
              key={opt.id}
              variant="outline-secondary"
              size="sm"
              disabled={isProcessing}
              onClick={() => {
                onRestyle(opt.id);
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
