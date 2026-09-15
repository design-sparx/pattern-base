import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Card, Steps, theme, Typography } from "antd";

import type { ChainedActionProps } from "@patternbase/core";

const { Text } = Typography;

const statusToSteps: Record<string, "wait" | "process" | "finish" | "error"> = {
  idle: "wait",
  active: "process",
  completed: "finish",
  error: "error",
};

export function ChainedAction({
  steps,
  onExecute,
  onStepClick,
  isExecuting = false,
  title,
}: Readonly<ChainedActionProps>) {
  const { token } = theme.useToken();
  const statusIcon: Record<string, React.ReactNode> = {
    idle: <ClockCircleOutlined />,
    active: <LoadingOutlined />,
    completed: <CheckCircleOutlined style={{ color: token.colorSuccess }} />,
    error: <CloseCircleOutlined style={{ color: token.colorError }} />,
  };

  return (
    <Card size="small">
      {title ? (
        <Text strong style={{ display: "block", marginBottom: 12 }}>
          {title}
        </Text>
      ) : null}

      <Steps
        direction="vertical"
        size="small"
        items={steps.map((step) => ({
          title: (
            <span
              style={{ cursor: onStepClick ? "pointer" : undefined }}
              onClick={() => onStepClick?.(step.id)}
            >
              {step.label}
            </span>
          ),
          description: (
            <div>
              {step.description ? (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {step.description}
                </Text>
              ) : null}
              {step.result ? (
                <div>
                  <Text italic style={{ fontSize: 12 }}>
                    {step.result}
                  </Text>
                </div>
              ) : null}
            </div>
          ),
          status: statusToSteps[step.status ?? "idle"],
          icon: statusIcon[step.status ?? "idle"],
        }))}
      />

      <Button
        variant="solid"
        size="small"
        onClick={onExecute}
        loading={isExecuting}
        style={{ marginTop: 12 }}
      >
        {isExecuting ? "Running..." : "Execute"}
      </Button>
    </Card>
  );
}
