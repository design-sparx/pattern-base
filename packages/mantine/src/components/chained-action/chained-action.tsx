import { Button, Stack, Stepper, Text } from "@mantine/core";

import type { ChainedActionProps } from "@ai-ui/core";

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
    <Stack gap="md">
      {title && (
        <Text fw={600} size="sm">
          {title}
        </Text>
      )}

      <Stepper active={active} size="sm">
        {steps.map((step) => (
          <Stepper.Step
            key={step.id}
            label={
              <Text
                size="sm"
                fw={500}
                style={{ cursor: onStepClick ? "pointer" : undefined }}
                onClick={() => onStepClick?.(step.id)}
              >
                {step.label}
              </Text>
            }
            description={step.description}
            color={
              step.status === "error"
                ? "red"
                : step.status === "completed"
                  ? "green"
                  : undefined
            }
            loading={step.status === "active" && isExecuting}
          >
            {step.result && (
              <Text size="xs" c="dimmed" mt="xs">
                {step.result}
              </Text>
            )}
          </Stepper.Step>
        ))}
      </Stepper>

      <Button
        onClick={onExecute}
        loading={isExecuting}
        disabled={steps.every((s) => s.status === "completed")}
        size="sm"
      >
        Execute
      </Button>
    </Stack>
  );
}
