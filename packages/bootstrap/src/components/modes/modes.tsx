import {
  ButtonGroup,
  Card,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
} from "react-bootstrap";

import type { ModesProps } from "@patternbase/core";

export function Modes({
  modes,
  selectedModeId,
  onModeChange,
  title = "Modes",
  variant = "segmented",
}: Readonly<ModesProps>) {
  const enabledModes = modes.filter((mode) => !mode.disabled);

  if (variant === "tabs") {
    return (
      <Card>
        <Card.Header>
          <h6 className="mb-0">{title}</h6>
        </Card.Header>
        <Card.Body>
          <Tabs
            activeKey={selectedModeId}
            onSelect={(key) => {
              if (key) onModeChange(key);
            }}
            className="mb-3"
          >
            {enabledModes.map((mode) => (
              <Tab
                key={mode.id}
                eventKey={mode.id}
                title={
                  <span>
                    {mode.icon ? `${mode.icon} ` : ""}
                    {mode.label}
                  </span>
                }
              >
                {mode.description ? (
                  <small className="text-muted">{mode.description}</small>
                ) : null}
              </Tab>
            ))}
          </Tabs>
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
        <Stack gap={2}>
          <ButtonGroup size="sm">
            {enabledModes.map((mode) => (
              <ToggleButton
                key={mode.id}
                id={`mode-${mode.id}`}
                type="radio"
                name="mode-options"
                value={mode.id}
                checked={selectedModeId === mode.id}
                variant="outline-primary"
                onChange={(e) => {
                  onModeChange(e.currentTarget.value);
                }}
              >
                {mode.icon ? `${mode.icon} ` : ""}
                {mode.label}
              </ToggleButton>
            ))}
          </ButtonGroup>
          {enabledModes.map((mode) =>
            mode.id === selectedModeId && mode.description ? (
              <small key={mode.id} className="text-muted">
                {mode.description}
              </small>
            ) : null,
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
