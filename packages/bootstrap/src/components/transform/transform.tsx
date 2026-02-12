import { Button, Card, Dropdown, Spinner } from "react-bootstrap";

import type { TransformProps } from "@ai-ui/core";

export function Transform({
  content,
  options,
  onTransform,
  transformedContent,
  isTransforming = false,
  title,
  variant = "buttons",
}: Readonly<TransformProps>) {
  const displayContent = transformedContent ?? content;

  if (variant === "dropdown") {
    return (
      <Card>
        <Card.Body>
          {title ? <Card.Title className="fs-6">{title}</Card.Title> : null}
          <Card.Text className="small">{displayContent}</Card.Text>
          <div className="d-flex align-items-center gap-2">
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-primary"
                size="sm"
                disabled={isTransforming}
              >
                Transform
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {options.map((opt) => (
                  <Dropdown.Item
                    key={opt.id}
                    onClick={() => {
                      onTransform(opt.id);
                    }}
                  >
                    {opt.icon ? <span className="me-1">{opt.icon}</span> : null}
                    {opt.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {isTransforming ? <Spinner animation="border" size="sm" /> : null}
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (variant === "toolbar") {
    return (
      <div>
        {title ? <h6>{title}</h6> : null}
        <div className="mb-2 rounded border p-2">
          <p className="small mb-0">{displayContent}</p>
        </div>
        <div className="d-flex flex-wrap gap-1">
          {options.map((opt) => (
            <Button
              key={opt.id}
              variant="light"
              size="sm"
              disabled={isTransforming}
              onClick={() => {
                onTransform(opt.id);
              }}
            >
              {opt.icon ? <span className="me-1">{opt.icon}</span> : null}
              {opt.label}
            </Button>
          ))}
          {isTransforming ? <Spinner animation="border" size="sm" /> : null}
        </div>
      </div>
    );
  }

  return (
    <Card>
      <Card.Body>
        {title ? <Card.Title className="fs-6">{title}</Card.Title> : null}
        <Card.Text className="small">{displayContent}</Card.Text>
        <div className="d-flex flex-wrap gap-2">
          {options.map((opt) => (
            <Button
              key={opt.id}
              variant="outline-secondary"
              size="sm"
              disabled={isTransforming}
              onClick={() => {
                onTransform(opt.id);
              }}
            >
              {opt.icon ? <span className="me-1">{opt.icon}</span> : null}
              {opt.label}
            </Button>
          ))}
          {isTransforming ? <Spinner animation="border" size="sm" /> : null}
        </div>
      </Card.Body>
    </Card>
  );
}
