import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

import type { ConsentProps } from "@patternbase/core";

export function Consent({
  items,
  onAccept,
  onDecline,
  title,
  description,
  acceptLabel = "Accept",
  declineLabel = "Decline",
}: Readonly<ConsentProps>) {
  const [checked, setChecked] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const item of items) {
      if (item.defaultChecked) initial.add(item.id);
    }
    return initial;
  });

  const requiredMet = items
    .filter((i) => i.required)
    .every((i) => checked.has(i.id));

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Card>
      <Card.Body>
        {title ? <Card.Title className="fs-6">{title}</Card.Title> : null}
        {description ? <p className="text-muted small">{description}</p> : null}

        {items.map((item) => (
          <Form.Check
            key={item.id}
            type="checkbox"
            className="mb-2"
            label={
              <span>
                {item.label}
                {item.required ? (
                  <span className="text-danger ms-1">*</span>
                ) : null}
                {item.description ? (
                  <div className="text-muted small">{item.description}</div>
                ) : null}
              </span>
            }
            checked={checked.has(item.id)}
            onChange={() => {
              toggle(item.id);
            }}
          />
        ))}

        <div className="d-flex mt-3 gap-2">
          <Button
            variant="primary"
            size="sm"
            disabled={!requiredMet}
            onClick={() => {
              onAccept(Array.from(checked));
            }}
          >
            {acceptLabel}
          </Button>
          {onDecline ? (
            <Button variant="outline-secondary" size="sm" onClick={onDecline}>
              {declineLabel}
            </Button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
}
