import { Check, Loader2, X } from "lucide-react";

import type { ChainedActionProps, ChainedActionStep } from "@patternbase/core";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getStepStatusClass(
  isError: boolean,
  isDone: boolean,
  isActive: boolean,
) {
  if (isError) {
    return "border-destructive text-destructive";
  }
  if (isDone) {
    return "bg-primary border-primary text-primary-foreground";
  }
  if (isActive) {
    return "border-primary text-primary";
  }
  return "border-border text-muted-foreground";
}

function StepStatus({
  index,
  isError,
  isDone,
  isActive,
  isExecuting,
}: {
  index: number;
  isError: boolean;
  isDone: boolean;
  isActive: boolean;
  isExecuting: boolean;
}) {
  if (isError) {
    return <X className="size-3" />;
  }
  if (isDone) {
    return <Check className="size-3" />;
  }
  if (isActive && isExecuting) {
    return <Loader2 className="size-3 animate-spin" />;
  }
  return <span>{index + 1}</span>;
}

function StepRow({
  step,
  index,
  isLast,
  isError,
  isDone,
  isActive,
  isExecuting,
  onStepClick,
}: {
  step: ChainedActionStep;
  index: number;
  isLast: boolean;
  isError: boolean;
  isDone: boolean;
  isActive: boolean;
  isExecuting: boolean;
  onStepClick: ChainedActionProps["onStepClick"];
}) {
  const label = (
    <span className={cn("text-sm", isDone && "text-muted-foreground")}>
      {step.label}
    </span>
  );

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs",
            getStepStatusClass(isError, isDone, isActive),
          )}
        >
          <StepStatus
            index={index}
            isError={isError}
            isDone={isDone}
            isActive={isActive}
            isExecuting={isExecuting}
          />
        </span>
        {!isLast ? (
          <span
            className={cn("bg-border w-px flex-1", isDone && "bg-primary")}
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col gap-0.5 pb-4">
        {onStepClick ? (
          <button
            type="button"
            className="cursor-pointer text-left text-sm"
            onClick={() => {
              onStepClick(step.id);
            }}
          >
            {label}
          </button>
        ) : (
          label
        )}
        {step.description ? (
          <span className="text-muted-foreground text-xs">
            {step.description}
          </span>
        ) : null}
        {step.result ? (
          <span className="text-muted-foreground text-xs">{step.result}</span>
        ) : null}
      </div>
    </div>
  );
}

export function ChainedAction({
  steps,
  onExecute,
  onStepClick,
  isExecuting = false,
  title,
}: ChainedActionProps) {
  const activeIndex = steps.findIndex((s) => s.status === "active");
  const active =
    activeIndex >= 0
      ? activeIndex
      : steps.filter((s) => s.status === "completed").length;

  return (
    <div className="flex flex-col gap-4">
      {title ? <span className="text-sm font-semibold">{title}</span> : null}

      <div className="flex flex-col">
        {steps.map((step, index) => {
          const isDone = index < active;
          const isActive = !isDone && step.status === "active";
          const isError = step.status === "error";

          return (
            <StepRow
              key={step.id}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
              isError={isError}
              isDone={isDone}
              isActive={isActive}
              isExecuting={isExecuting}
              onStepClick={onStepClick}
            />
          );
        })}
      </div>

      <Button
        onClick={onExecute}
        disabled={steps.every((s) => s.status === "completed")}
        size="sm"
      >
        {isExecuting ? <Loader2 className="size-3.5 animate-spin" /> : null}
        Execute
      </Button>
    </div>
  );
}
