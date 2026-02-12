import { Badge, Button, Card, Spinner } from "react-bootstrap";

import type { ChainedActionProps } from "@ai-ui/core";

const statusColors: Record<string, string> = {
  idle: "secondary",
  active: "primary",
  completed: "success",
  error: "danger",
};

const statusIcons: Record<string, string> = {
  idle: "\u25CB",
  active: "\u25D4",
  completed: "\u2713",
  error: "\u2717",
};

export function ChainedAction({
  steps,
  onExecute,
  onStepClick,
  isExecuting = false,
  title,
}: Readonly<ChainedActionProps>) {
  return (
    <Card>
      <Card.Body>
        {title ? <Card.Title className="fs-6">{title}</Card.Title> : null}
        <div>
          {steps.map((step, i) => (
            <div key={step.id} className="d-flex align-items-start mb-2 gap-2">
              <Badge bg={statusColors[step.status ?? "idle"]}>
                {statusIcons[step.status ?? "idle"]}
              </Badge>
              <div
                className="flex-grow-1"
                style={{ cursor: onStepClick ? "pointer" : undefined }}
                onClick={() => onStepClick?.(step.id)}
              >
                <div className="small fw-semibold">
                  {i + 1}. {step.label}
                </div>
                {step.description ? (
                  <div className="text-muted small">{step.description}</div>
                ) : null}
                {step.result ? (
                  <div className="small fst-italic mt-1">{step.result}</div>
                ) : null}
              </div>
              {step.status === "active" ? (
                <Spinner animation="border" size="sm" />
              ) : null}
            </div>
          ))}
        </div>
        <Button
          variant="primary"
          size="sm"
          className="mt-2"
          onClick={onExecute}
          disabled={isExecuting}
        >
          {isExecuting ? (
            <>
              <Spinner animation="border" size="sm" className="me-1" />
              Running...
            </>
          ) : (
            "Execute"
          )}
        </Button>
      </Card.Body>
    </Card>
  );
}
