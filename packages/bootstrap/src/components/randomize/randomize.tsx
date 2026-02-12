import { Button, Form, InputGroup, Spinner } from "react-bootstrap";

import type { RandomizeProps } from "@ai-ui/core";

export function Randomize({
  onRandomize,
  isRandomizing = false,
  currentSeed,
  onSeedChange,
  showSeed = false,
  label = "Randomize",
  variant = "button",
}: Readonly<RandomizeProps>) {
  const button = (
    <Button
      variant={variant === "icon" ? "link" : "outline-primary"}
      size={variant === "fab" ? "lg" : "sm"}
      onClick={onRandomize}
      disabled={isRandomizing}
      className={variant === "fab" ? "rounded-circle" : ""}
    >
      {isRandomizing ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <>
          <span className="me-1">{"\uD83C\uDFB2"}</span>
          {variant !== "icon" ? label : null}
        </>
      )}
    </Button>
  );

  if (showSeed && onSeedChange) {
    return (
      <div className="d-flex align-items-center gap-2">
        {button}
        <InputGroup size="sm" style={{ maxWidth: 200 }}>
          <InputGroup.Text>Seed</InputGroup.Text>
          <Form.Control
            value={currentSeed ?? ""}
            onChange={(e) => {
              onSeedChange(e.target.value);
            }}
            placeholder="auto"
          />
        </InputGroup>
      </div>
    );
  }

  return button;
}
