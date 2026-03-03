import { Badge, Card, Form, ListGroup, Stack } from "react-bootstrap";

import type { ControlsProps } from "@ai-ui/core";

const statusBadgeMap = {
  active: "success",
  disabled: "secondary",
  restricted: "warning",
} as const;

export function Controls({
  controls,
  onToggleControl,
  title = "Controls",
  variant = "list",
  showStatus = true,
}: Readonly<ControlsProps>) {
  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <ListGroup
        variant="flush"
        horizontal={variant === "cards" ? "md" : undefined}
        className={variant === "cards" ? "flex-wrap" : undefined}
      >
        {controls.map((control) => (
          <ListGroup.Item
            key={control.id}
            className={
              variant === "cards" ? "col-md-6 border-bottom" : undefined
            }
          >
            <Stack gap={1}>
              <div className="d-flex align-items-center justify-content-between gap-2">
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <strong className="small">{control.label}</strong>
                  {showStatus && control.status ? (
                    <Badge bg={statusBadgeMap[control.status]}>
                      {control.status}
                    </Badge>
                  ) : null}
                </div>
                <Form.Check
                  type="switch"
                  id={`control-${control.id}`}
                  checked={control.enabled}
                  disabled={control.locked}
                  onChange={(e) => {
                    onToggleControl(control.id, e.currentTarget.checked);
                  }}
                />
              </div>
              {control.description ? (
                <small className="text-muted">{control.description}</small>
              ) : null}
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
