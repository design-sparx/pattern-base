import { Badge, Button, ListGroup } from "react-bootstrap";

import type { FollowUpProps } from "@patternbase/core";

export function FollowUp({
  followUps,
  onSelect,
  variant = "chip",
  title,
  maxVisible,
}: Readonly<FollowUpProps>) {
  const visible = maxVisible ? followUps.slice(0, maxVisible) : followUps;

  if (variant === "list") {
    return (
      <div>
        {title ? <h6 className="mb-2">{title}</h6> : null}
        <ListGroup>
          {visible.map((f) => (
            <ListGroup.Item
              key={f.id}
              action
              onClick={() => {
                onSelect(f);
              }}
            >
              {f.icon ? <span className="me-2">{f.icon}</span> : null}
              {f.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }

  if (variant === "button") {
    return (
      <div>
        {title ? <h6 className="mb-2">{title}</h6> : null}
        <div className="d-flex flex-wrap gap-2">
          {visible.map((f) => (
            <Button
              key={f.id}
              variant="outline-primary"
              size="sm"
              onClick={() => {
                onSelect(f);
              }}
            >
              {f.icon ? <span className="me-1">{f.icon}</span> : null}
              {f.text}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {title ? <h6 className="mb-2">{title}</h6> : null}
      <div className="d-flex flex-wrap gap-2">
        {visible.map((f) => (
          <Badge
            key={f.id}
            bg="primary"
            pill
            style={{
              cursor: "pointer",
              fontSize: "0.85em",
              padding: "6px 14px",
            }}
            onClick={() => {
              onSelect(f);
            }}
          >
            {f.icon ? <span className="me-1">{f.icon}</span> : null}
            {f.text}
          </Badge>
        ))}
      </div>
    </div>
  );
}
