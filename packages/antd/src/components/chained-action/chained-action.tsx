import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Card, Steps, Typography } from "antd";

import type { ChainedActionProps } from "@ai-ui/core";

const { Text } = Typography;

const statusToSteps: Record<string, "wait" | "process" | "finish" | "error"> = {
  idle: "wait",
  active: "process",
  completed: "finish",
  error: "error",
};

const statusIcon: Record<string, React.ReactNode> = {
  idle: <ClockCircleOutlined />,
  active: <LoadingOutlined />,
  completed: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
  error: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
};

export function ChainedAction({
  steps,
  onExecute,
  onStepClick,
  isExecuting = false,
  title,
}: Readonly<ChainedActionProps>) {
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
        type="primary"
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
