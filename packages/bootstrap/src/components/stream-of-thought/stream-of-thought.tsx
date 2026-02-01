import { useState } from "react";
import { Accordion, Badge, Spinner, Stack } from "react-bootstrap";

import type { StreamOfThoughtProps } from "@ai-ui/core";

const STEP_CONFIG: Record<string, { icon: string; color: string }> = {
  thinking: { icon: "\uD83D\uDCAD", color: "#8b5cf6" },
  action: { icon: "\u26A1", color: "#3b82f6" },
  tool_call: { icon: "\uD83D\uDD27", color: "#f59e0b" },
  result: { icon: "\u2705", color: "#10b981" },
};

export function StreamOfThought({
  steps,
  isStreaming = false,
  collapsible = true,
}: StreamOfThoughtProps) {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  return (
    <Stack gap={2}>
      <div className="d-flex align-items-center gap-2">
        <span>\uD83E\uDDE0</span>
        <h6 className="mb-0">Reasoning Process</h6>
        {isStreaming ? <Spinner animation="border" size="sm" /> : null}
        <Badge bg="secondary">{steps.length} steps</Badge>
      </div>

      {collapsible ? (
        <Accordion
          activeKey={activeKeys}
          onSelect={(keys) => {
            setActiveKeys(keys as string[]);
          }}
          alwaysOpen
        >
          {steps.map((step, index) => {
            const config = STEP_CONFIG[step.type] ?? {
              icon: "\u2022",
              color: "#6b7280",
            };
            return (
              <Accordion.Item key={step.id} eventKey={step.id}>
                <Accordion.Header>
                  <div className="d-flex align-items-center flex-grow-1 gap-2">
                    <Badge bg="secondary" pill>
                      {index + 1}
                    </Badge>
                    <span style={{ color: config.color }}>{config.icon}</span>
                    <span className="text-capitalize small fw-semibold">
                      {step.type.replace("_", " ")}
                    </span>
                    <span
                      className="text-muted small text-truncate"
                      style={{ maxWidth: 300 }}
                    >
                      {step.content.substring(0, 80)}
                    </span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <pre
                    className="small mb-2"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {step.content}
                  </pre>
                  {step.metadata && Object.keys(step.metadata).length > 0 ? (
                    <div className="border-top mt-2 pt-2">
                      <strong className="small">Metadata:</strong>
                      <pre className="small text-muted">
                        {JSON.stringify(step.metadata, null, 2)}
                      </pre>
                    </div>
                  ) : null}
                  <div className="text-muted small">
                    {new Date(step.timestamp).toLocaleString()}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      ) : (
        <Stack gap={2}>
          {steps.map((step, index) => {
            const config = STEP_CONFIG[step.type] ?? {
              icon: "\u2022",
              color: "#6b7280",
            };
            return (
              <div key={step.id} className="rounded border p-2">
                <div className="d-flex align-items-center mb-1 gap-2">
                  <Badge bg="secondary" pill>
                    {index + 1}
                  </Badge>
                  <span style={{ color: config.color }}>{config.icon}</span>
                  <span className="text-capitalize small fw-semibold">
                    {step.type.replace("_", " ")}
                  </span>
                </div>
                <p className="small mb-0">{step.content}</p>
              </div>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
