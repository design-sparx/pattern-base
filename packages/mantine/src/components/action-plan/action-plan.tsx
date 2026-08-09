import { Button, Card, Group, Stack, Stepper, Text } from "@mantine/core";

import type { ActionPlanProps } from "@patternbase/core";

export function ActionPlan({
  steps,
  title,
  onApprove,
  onReject,
  onStepClick,
  showEstimates = false,
}: Readonly<ActionPlanProps>) {
  const activeIndex = steps.findIndex((s) => s.status === "in-progress");
  const active =
    activeIndex >= 0
      ? activeIndex
      : steps.filter((s) => s.status === "completed").length;

  return (
    <Card padding="sm" withBorder>
      <Stack gap="sm">
        {title && <Text fw={600}>{title}</Text>}

        <Stepper active={active} orientation="vertical" size="sm">
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
                  {step.title}
                  {step.tool && (
                    <Text component="span" size="xs" c="dimmed" ml="xs">
                      ({step.tool})
                    </Text>
                  )}
                </Text>
              }
              description={
                <Stack gap={2}>
                  {step.description && (
                    <Text size="xs" c="dimmed">
                      {step.description}
                    </Text>
                  )}
                  {showEstimates && step.estimatedDuration && (
                    <Text size="xs" c="dimmed">
                      Est: {step.estimatedDuration}
                    </Text>
                  )}
                </Stack>
              }
              color={
                step.status === "failed"
                  ? "red"
                  : step.status === "completed"
                    ? "green"
                    : step.status === "skipped"
                      ? "gray"
                      : undefined
              }
              loading={step.status === "in-progress"}
            />
          ))}
        </Stepper>

        {(onApprove ?? onReject) && (
          <Group gap="sm" mt="xs">
            {onApprove && (
              <Button size="sm" onClick={onApprove}>
                Approve
              </Button>
            )}
            {onReject && (
              <Button
                size="sm"
                color="red"
                variant="outline"
                onClick={onReject}
              >
                Reject
              </Button>
            )}
          </Group>
        )}
      </Stack>
    </Card>
  );
}
