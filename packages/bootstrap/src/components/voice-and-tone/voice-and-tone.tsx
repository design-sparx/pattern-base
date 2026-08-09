import { Card, Form } from "react-bootstrap";

import type { VoiceAndToneProps } from "@patternbase/core";

export function VoiceAndTone({
  axes,
  onChange,
  title = "Voice and Tone",
  showValues = true,
  variant = "sliders",
}: Readonly<VoiceAndToneProps>) {
  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <Card.Body className="d-flex flex-column gap-3">
        {axes.map((axis) => (
          <div key={axis.id}>
            <div className="d-flex justify-content-between mb-1">
              <small className="fw-semibold">{axis.label}</small>
              {showValues ? (
                <small className="text-muted">{axis.value}</small>
              ) : null}
            </div>
            <div className="d-flex align-items-center gap-2">
              {variant === "sliders" ? (
                <small className="text-muted text-nowrap">
                  {axis.leftLabel}
                </small>
              ) : null}
              <Form.Range
                min={axis.min ?? -100}
                max={axis.max ?? 100}
                step={axis.step ?? 1}
                value={axis.value}
                onChange={(e) => {
                  onChange(axis.id, Number(e.currentTarget.value));
                }}
              />
              {variant === "sliders" ? (
                <small className="text-muted text-nowrap">
                  {axis.rightLabel}
                </small>
              ) : null}
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}
