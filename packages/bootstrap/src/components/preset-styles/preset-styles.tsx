import { Button, Card } from "react-bootstrap";

import type { PresetStylesProps } from "@patternbase/core";

export function PresetStyles({
  presets,
  selectedPresetId,
  onApplyPreset,
  title = "Preset Styles",
  variant = "buttons",
}: Readonly<PresetStylesProps>) {
  if (variant === "cards") {
    return (
      <Card>
        <Card.Header>
          <h6 className="mb-0">{title}</h6>
        </Card.Header>
        <Card.Body>
          <div
            className="d-grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            }}
          >
            {presets.map((preset) => (
              <Card
                key={preset.id}
                className={
                  selectedPresetId === preset.id ? "border-primary" : undefined
                }
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onApplyPreset(preset.id, preset.values);
                }}
              >
                <Card.Body className="px-3 py-2">
                  <div className="small fw-semibold">
                    {preset.icon ? <span style={{ marginRight: 4 }}>{preset.icon}</span> : null}
                    {preset.label}
                  </div>
                  {preset.description ? (
                    <small className="text-muted">{preset.description}</small>
                  ) : null}
                </Card.Body>
              </Card>
            ))}
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.id}
              size="sm"
              variant={
                selectedPresetId === preset.id ? "primary" : "outline-secondary"
              }
              onClick={() => {
                onApplyPreset(preset.id, preset.values);
              }}
            >
              {preset.icon ? <span className="me-1">{preset.icon}</span> : null}
              {preset.label}
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}
