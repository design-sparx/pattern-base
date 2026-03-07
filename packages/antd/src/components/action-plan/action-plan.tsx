import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Space, Steps, theme, Typography } from "antd";

import type { ActionPlanProps, ActionPlanStep } from "@ai-ui/core";

const { Text } = Typography;

const statusToSteps: Record<
  ActionPlanStep["status"],
  "wait" | "process" | "finish" | "error"
> = {
  pending: "wait",
  "in-progress": "process",
  completed: "finish",
  failed: "error",
  skipped: "wait",
};

export function ActionPlan({
  steps,
  title,
  onApprove,
  onReject,
  onStepClick,
  showEstimates = false,
}: Readonly<ActionPlanProps>) {
  const { token } = theme.useToken();
  const statusIcon: Record<ActionPlanStep["status"], React.ReactNode> = {
    pending: <ClockCircleOutlined />,
    "in-progress": <LoadingOutlined />,
    completed: <CheckCircleOutlined style={{ color: token.colorSuccess }} />,
    failed: <CloseCircleOutlined style={{ color: token.colorError }} />,
    skipped: <MinusCircleOutlined style={{ color: token.colorTextTertiary }} />,
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
              {step.title}
              {step.tool ? (
                <Text type="secondary" style={{ marginLeft: 4 }}>
                  ({step.tool})
                </Text>
              ) : null}
            </span>
          ),
          description: (
            <div>
              {step.description ? (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {step.description}
                </Text>
              ) : null}
              {showEstimates && step.estimatedDuration ? (
                <div>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    Est: {step.estimatedDuration}
                  </Text>
                </div>
              ) : null}
            </div>
          ),
          status: statusToSteps[step.status],
          icon: statusIcon[step.status],
        }))}
      />

      {onApprove || onReject ? (
        <Space style={{ marginTop: 12 }}>
          {onApprove ? (
            <Button type="primary" size="small" onClick={onApprove}>
              Approve
            </Button>
          ) : null}
          {onReject ? (
            <Button danger size="small" onClick={onReject}>
              Reject
            </Button>
          ) : null}
        </Space>
      ) : null}
    </Card>
  );
}
