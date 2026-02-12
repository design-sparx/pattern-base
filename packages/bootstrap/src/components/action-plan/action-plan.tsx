import { Button, Card } from "react-bootstrap";

import type { ActionPlanProps, ActionPlanStep } from "@ai-ui/core";

const statusIcons: Record<ActionPlanStep["status"], string> = {
  pending: "\u25CB",
  "in-progress": "\u25D4",
  completed: "\u2713",
  failed: "\u2717",
  skipped: "\u2014",
};

const statusColors: Record<ActionPlanStep["status"], string> = {
  pending: "text-muted",
  "in-progress": "text-primary",
  completed: "text-success",
  failed: "text-danger",
  skipped: "text-secondary",
};

function StepItem({
  step,
  index,
  onStepClick,
  showEstimates,
}: Readonly<{
  step: ActionPlanStep;
  index: number;
  onStepClick?: (id: string) => void;
  showEstimates?: boolean;
}>) {
  return (
    <div
      className={`d-flex align-items-start mb-2 gap-2 ${onStepClick ? "cursor-pointer" : ""}`}
      style={{ cursor: onStepClick ? "pointer" : undefined }}
      onClick={() => onStepClick?.(step.id)}
    >
      <span className={`${statusColors[step.status]} fw-bold`}>
        {statusIcons[step.status]}
      </span>
      <div className="flex-grow-1">
        <div className="small fw-semibold">
          {index + 1}. {step.title}
          {step.tool ? (
            <span className="text-muted ms-1">({step.tool})</span>
          ) : null}
        </div>
        {step.description ? (
          <div className="text-muted small">{step.description}</div>
        ) : null}
        {showEstimates && step.estimatedDuration ? (
          <div className="text-muted small">Est: {step.estimatedDuration}</div>
        ) : null}
        {step.substeps?.map((sub, i) => (
          <StepItem
            key={sub.id}
            step={sub}
            index={i}
            onStepClick={onStepClick}
            showEstimates={showEstimates}
          />
        ))}
      </div>
    </div>
  );
}

export function ActionPlan({
  steps,
  title,
  onApprove,
  onReject,
  onStepClick,
  showEstimates = false,
}: Readonly<ActionPlanProps>) {
  return (
    <Card>
      <Card.Body>
        {title ? <Card.Title className="fs-6">{title}</Card.Title> : null}
        <div>
          {steps.map((step, i) => (
            <StepItem
              key={step.id}
              step={step}
              index={i}
              onStepClick={onStepClick}
              showEstimates={showEstimates}
            />
          ))}
        </div>
        {onApprove || onReject ? (
          <div className="d-flex mt-3 gap-2">
            {onApprove ? (
              <Button variant="primary" size="sm" onClick={onApprove}>
                Approve
              </Button>
            ) : null}
            {onReject ? (
              <Button variant="outline-danger" size="sm" onClick={onReject}>
                Reject
              </Button>
            ) : null}
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}
