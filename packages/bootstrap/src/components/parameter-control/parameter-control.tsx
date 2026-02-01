import { Form, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";

import type { ParameterControlProps } from "@ai-ui/core";

export function ParameterControl({
  parameters,
  onChange,
  title = "Parameters",
  layout = "vertical",
}: ParameterControlProps) {
  return (
    <Stack gap={3}>
      {title ? <h6 className="mb-0">{title}</h6> : null}
      <div className={layout === "horizontal" ? "d-flex flex-wrap gap-3" : ""}>
        {parameters.map((param) => (
          <div
            key={param.id}
            className={layout === "horizontal" ? "flex-fill" : "mb-2"}
          >
            <div className="d-flex align-items-center mb-1 gap-2">
              <Form.Label className="fw-semibold small mb-0">
                {param.label}
              </Form.Label>
              {param.description ? (
                <OverlayTrigger
                  overlay={<Tooltip>{param.description}</Tooltip>}
                >
                  <span
                    className="text-muted"
                    style={{ cursor: "help", fontSize: "12px" }}
                  >
                    &#9432;
                  </span>
                </OverlayTrigger>
              ) : null}
            </div>

            {param.type === "slider" && (
              <>
                <Form.Range
                  min={param.min ?? 0}
                  max={param.max ?? 100}
                  step={param.step ?? 1}
                  value={param.value as number}
                  onChange={(e) => {
                    onChange(param.id, Number(e.target.value));
                  }}
                />
                <Form.Text className="text-muted">
                  Current: {String(param.value)}
                </Form.Text>
              </>
            )}

            {param.type === "toggle" && (
              <Form.Check
                type="switch"
                checked={param.value as boolean}
                onChange={(e) => {
                  onChange(param.id, e.target.checked);
                }}
              />
            )}

            {param.type === "select" && (
              <Form.Select
                value={param.value as string}
                onChange={(e) => {
                  onChange(param.id, e.target.value);
                }}
                size="sm"
              >
                {param.options?.map((opt) => (
                  <option key={String(opt.value)} value={opt.value as string}>
                    {opt.label}
                  </option>
                ))}
              </Form.Select>
            )}

            {param.type === "matrix" &&
              (() => {
                const matrixValue = param.value as
                  | Record<string, number>
                  | undefined;
                return (
                  <div className="row g-2">
                    <div className="col-6">
                      <Form.Label className="small text-muted">
                        {param.options?.[0]?.label ?? "X"}
                      </Form.Label>
                      <Form.Range
                        value={matrixValue?.x ?? 50}
                        onChange={(e) => {
                          onChange(param.id, {
                            ...matrixValue,
                            x: Number(e.target.value),
                          });
                        }}
                      />
                    </div>
                    <div className="col-6">
                      <Form.Label className="small text-muted">
                        {param.options?.[1]?.label ?? "Y"}
                      </Form.Label>
                      <Form.Range
                        value={matrixValue?.y ?? 50}
                        onChange={(e) => {
                          onChange(param.id, {
                            ...matrixValue,
                            y: Number(e.target.value),
                          });
                        }}
                      />
                    </div>
                  </div>
                );
              })()}
          </div>
        ))}
      </div>
    </Stack>
  );
}
